import { ReactElement, useCallback } from 'react'
import { useToaster as useToasterHook } from 'rsuite'

export type PlacementType = 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd'

export const defaultToasterOptions = {
  duration: 5000,
  placement: 'topEnd' as PlacementType,
}

export const useToaster = () => {
  const { push } = useToasterHook()

  const customPush = useCallback(
    (message: string | ReactElement, options: Partial<typeof defaultToasterOptions> = {}) => {
      push(message, { ...defaultToasterOptions, ...options })
    },
    [push]
  )

  return { push: customPush }
}
