import { Message } from 'rsuite'

type ToastTemplateProps = {
  header?: string
  message?: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export const ToastTemplate = ({ header, message, type }: ToastTemplateProps) => (
  <Message showIcon type={type} closable>
    {header ? <strong>{header}</strong> : null}
    {message}
  </Message>
)
