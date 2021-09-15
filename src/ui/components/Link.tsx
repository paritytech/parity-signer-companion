import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import type { ExtThemeProps } from '../types'

type Props = ExtThemeProps & {
  isDanger?: boolean
  isDisabled?: boolean
  onClick?: () => void
  title?: string
  to?: string
}

const Link: React.FC<Props> = ({
  children,
  className,
  isDisabled,
  onClick,
  title,
  to,
}) => {
  if (isDisabled)
    return (
      <div className={`${className} isDisabled`} title={title}>
        {children}
      </div>
    )

  if (to)
    return (
      <RouterLink className={className} onClick={onClick} title={title} to={to}>
        {children}
      </RouterLink>
    )

  return (
    <a className={className} href='#' onClick={onClick} title={title}>
      {children}
    </a>
  )
}

export default styled(Link)`
  align-items: center;
  color: ${({ isDanger, theme }: Props) =>
    isDanger ? theme.textColorDanger : theme.textColor};
  display: flex;
  opacity: 0.85;
  text-decoration: none;
  vertical-align: middle;

  &:hover {
    color: ${({ isDanger, theme }: Props) =>
      isDanger ? theme.textColorDanger : theme.textColor};
    opacity: 1;
  }

  &:visited {
    color: ${({ isDanger, theme }: Props) =>
      isDanger ? theme.textColorDanger : theme.textColor};
  }

  &.isDisabled {
    opacity: 0.4;
  }
`
