import { ToastTemplate } from './Template'

type ErrorToastProps = {
  header?: string
  message: string
}

export const ErrorToast = ({ header, message }: ErrorToastProps) => (
  <ToastTemplate header={header} message={message} type="error" />
)
