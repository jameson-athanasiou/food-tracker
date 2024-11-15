import { useCallback, useState } from 'react'
import { Button, ButtonToolbar, Input, InputPicker, Modal } from 'rsuite'
import { v4 as uuidV4 } from 'uuid'
import { useAddOrUpdateFoodEntryMutation } from '../mutations/AddOrUpdateFoodEntry.generated'
import { useFoodEntriesByDateQuery, FoodEntriesByDateDocument } from '../queries/FoodEntriesByDate.generated'
import { useExistingFoodItemsQuery } from '../queries/ExistingFoodItems.generated'
import { FoodEntry } from '../types.generated'

const styles = {
  marginBottom: 10,
}

export const AddNewFoodModal = () => {
  const [open, setOpen] = useState(false)
  const [showNutritionFacts, setShowNutritionFacts] = useState(false)
  const [addFoodEntry, { loading }] = useAddOrUpdateFoodEntryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: FoodEntriesByDateDocument, variables: { input: { date: '11/13/2024' } } }],
  })
  const { data: existingFoodItemsData, loading: existingFoodItemsLoading } = useExistingFoodItemsQuery()

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
    await addFoodEntry({
      variables: {
        input: {
          id: uuidV4(),
          date: '11/13/2024',
          food: foodName as string,
          servings,
          ...(calcium && { calcium }),
          ...(protein && { protein }),
        },
      },
    })
    handleClose()
  }, [addFoodEntry, calcium, foodName, handleClose, protein, servings])

  const existingFoodItems =
    existingFoodItemsData?.existingFoodItems?.map((item) => ({ label: item, value: item })) || []

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
          <InputPicker
            data={existingFoodItems}
            loading={existingFoodItemsLoading}
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
                onChange={(value) => setCalcium(Number(value))}
              />
              <Input
                placeholder="Protein"
                style={styles}
                value={calcium}
                onChange={(value) => setProtein(Number(value))}
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
