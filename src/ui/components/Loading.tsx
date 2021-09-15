import React from 'react'

const Loading: React.FC = ({ children }) => {
  if (!children) {
    return <div>{'... loading ...'}</div>
  }

  return <>{children}</>
}

export default Loading
