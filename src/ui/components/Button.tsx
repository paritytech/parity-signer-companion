import React from 'react'
import { cn } from '../../utils/cn'

export const Button = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn('', className)} {...rest} />
)

// TODO:
// export const Button = styled.button`
//   display: inline-block;
//   background: var(--color-button-bg);
//   border: none;
//   border-radius: 0.2rem;
//   color: var(--color-button-text);
//   font-size: var(--font-base-size);
//   line-height: 1;
//   margin: 0;
//   font-family: var(--font-base);
//   white-space: nowrap;
//   text-decoration: none;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   transition: var(--transition);

//   &:hover {
//     background: var(--color-button-bg-hover);
//   }

//   &.secondary {
//     padding: 0.4rem 0;
//     color: var(--color-faded-text);
//     background: none;
//   }

//   &.secondary:hover {
//     color: var(--color-main-text);
//   }
// `
