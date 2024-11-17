import { useCallback, useState } from 'react'
import { Button, ButtonToolbar, Input, InputPicker, Modal, useToaster, Message } from 'rsuite'
import { useUpdateFoodNutritionMutation } from '../mutations/UpdateFoodNutrition.generated'
import { FoodEntriesByDateDocument } from '../queries/FoodEntriesByDate.generated'
import {
  useExistingFoodItemsWithNutritionQuery,
  ExistingFoodItemsWithNutritionDocument,
} from '../queries/ExistingFoodItemsWithNutrition.generated'
import { defaultToasterOptions } from './Toast'

type UpdateExistingFoodModalProps = {
  selectedDate: string
}

const styles = {
  marginBottom: 10,
}

export const UpdateExistingFoodModal = ({ selectedDate }: UpdateExistingFoodModalProps) => {
  const [open, setOpen] = useState(false)
  const toaster = useToaster()
  const [updateFood, { loading }] = useUpdateFoodNutritionMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: FoodEntriesByDateDocument, variables: { input: { date: selectedDate } } },
      { query: ExistingFoodItemsWithNutritionDocument },
    ],
  })
  const { data: ExistingFoodItemsWithNutritionData, loading: existingFoodItemsLoading } =
    useExistingFoodItemsWithNutritionQuery()

  const [foodName, setFoodName] = useState<string>()
  const [calcium, setCalcium] = useState<string>()
  const [protein, setProtein] = useState<string>()

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const handleSave = useCallback(async () => {
    try {
      await updateFood({
        variables: {
          input: {
            food: foodName as string,
            ...(calcium && { calcium: parseFloat(calcium) }),
            ...(protein && { protein: parseFloat(protein) }),
          },
        },
      })
      handleClose()
      toaster.push(
        <Message showIcon type={'success'}>
          Food updated!
        </Message>,
        defaultToasterOptions
      )
    } catch (e) {
      console.error(e)
      toaster.push(
        <Message showIcon type={'error'}>
          Failed to update food
        </Message>,
        defaultToasterOptions
      )
    }
  }, [calcium, foodName, handleClose, protein, toaster, updateFood])

  const existingFoodItems =
    ExistingFoodItemsWithNutritionData?.existingFoodItems?.map((item) => ({ label: item.food, value: item.food })) || []

  return (
    <>
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleOpen}>
          Update existing food data
        </Button>
      </ButtonToolbar>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Update existing food data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputPicker
            data={existingFoodItems}
            placeholder="Food name"
            style={styles}
            value={foodName || ''}
            onChange={setFoodName}
          />
          <Input
            placeholder="Calcium"
            style={styles}
            value={calcium || ''}
            onChange={(value) => {
              console.log(value)
              setCalcium(value)
            }}
          />
          <Input
            placeholder="Protein"
            style={styles}
            value={protein || ''}
            onChange={(value) => {
              setProtein(value)
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button loading={loading} onClick={handleSave} appearance="primary">
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
