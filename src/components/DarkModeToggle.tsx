import { Toggle } from 'rsuite'

type DarkModeToggleProps = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const DarkModeToggle = ({ isDarkMode, toggleDarkMode }: DarkModeToggleProps) => {
  return (
    <Toggle color="violet" size="lg" onChange={() => toggleDarkMode()} checked={isDarkMode}>
      Dark mode
    </Toggle>
  )
}
