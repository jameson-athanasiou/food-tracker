import { useState } from 'react'
import { Button, ButtonToolbar, Input, Modal } from 'rsuite'

const styles = {
  marginBottom: 10,
}

export const AddNewFoodModal = () => {
  const [open, setOpen] = useState(false)
  const [showNutritionFacts, setShowNutritionFacts] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <Input placeholder="Food name" style={styles} />
          <Input placeholder="Servings" style={styles} />

          <Button onClick={() => setShowNutritionFacts((prev) => !prev)} style={styles}>
            {!showNutritionFacts ? 'Update' : 'Hide'} nutrition facts
          </Button>

          {showNutritionFacts ? (
            <>
              <Input placeholder="Calcium" style={styles} />
              <Input placeholder="Protein" style={styles} />
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Save
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
