import { useCallback, useState } from 'react'
import { Button, ButtonToolbar, Input, Modal, AutoComplete, useToaster, Message } from 'rsuite'
import { v4 as uuidV4 } from 'uuid'
import { useAddFoodEntryMutation } from '../mutations/AddFoodEntry.generated'
import { FoodEntriesByDateDocument } from '../queries/FoodEntriesByDate.generated'
import { useExistingFoodNamesQuery, ExistingFoodNamesDocument } from '../queries/ExistingFoodNames.generated'
import { defaultToasterOptions } from './Toast'

type AddNewFoodModalProps = {
  selectedDate: string
}

const styles = {
  marginBottom: 10,
}

export const AddNewFoodModal = ({ selectedDate }: AddNewFoodModalProps) => {
  const [open, setOpen] = useState(false)
  const toaster = useToaster()
  const [showNutritionFacts, setShowNutritionFacts] = useState(false)
  const [addFoodEntry, { loading }] = useAddFoodEntryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: FoodEntriesByDateDocument, variables: { input: { date: selectedDate } } },
      { query: ExistingFoodNamesDocument },
    ],
  })
  const { data: existingFoodNamesData } = useExistingFoodNamesQuery()

  const [foodName, setFoodName] = useState<string>()
  const [servings, setServings] = useState<number>(1)
  const [calcium, setCalcium] = useState<number>()
  const [protein, setProtein] = useState<number>()

  const hasMissingData = !foodName || !servings

  const clearAllFields = () => {
    setFoodName(undefined)
    setServings(1)
    setCalcium(undefined)
    setProtein(undefined)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => {
    setOpen(false)
    clearAllFields()
  }, [])

  const handleSave = useCallback(async () => {
    try {
      await addFoodEntry({
        variables: {
          input: {
            id: uuidV4(),
            date: selectedDate,
            food: foodName as string,
            servings,
            ...(calcium && { calcium }),
            ...(protein && { protein }),
          },
        },
      })
      handleClose()
    } catch (e) {
      console.error(e)
      toaster.push(
        <Message showIcon type={'error'}>
          Failed to save food
        </Message>,
        defaultToasterOptions
      )
    }
  }, [addFoodEntry, selectedDate, foodName, servings, calcium, protein, handleClose, toaster])

  const existingFoodItems =
    existingFoodNamesData?.existingFoodItems?.map((item) => ({ label: item.food, value: item.food })) || []

  return (
    <>
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleOpen}>
          Add entry
        </Button>
      </ButtonToolbar>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add new food entry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AutoComplete
            data={existingFoodItems}
            placeholder="Food name"
            style={styles}
            value={foodName || ''}
            onChange={setFoodName}
          />
          <Input
            placeholder="Servings"
            style={styles}
            value={servings}
            onChange={(value) => setServings(Number(value))}
          />

          <Button onClick={() => setShowNutritionFacts((prev) => !prev)} style={styles}>
            {!showNutritionFacts ? 'Update' : 'Hide'} nutrition facts
          </Button>

          {showNutritionFacts ? (
            <>
              <Input
                placeholder="Calcium"
                style={styles}
                value={calcium}
                onChange={(value) => setCalcium(parseFloat(value))}
              />
              <Input
                placeholder="Protein"
                style={styles}
                value={protein}
                onChange={(value) => setProtein(parseFloat(value))}
              />
            </>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button disabled={hasMissingData} loading={loading} onClick={handleSave} appearance="primary">
            Save
          </Button>
          <Button loading={loading} onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
