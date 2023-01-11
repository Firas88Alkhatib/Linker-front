export const classNames = (...classes: (string | undefined | null | false)[]) => {
  return (
    classes
      .filter((c) => c)
      .join(' ')
      .trim() || undefined
  )
}
