import styled, { css } from 'styled-components'

export const Container = styled.main`
  margin: 0 auto;
  width: 95%;
  max-width: 1400px;
  background-color: #f6f6f9;
`
export type SectionTopProps = {
  margin?: string
}

export const ButtonBackContainer = styled.div<SectionTopProps>`
  ${({ margin }) => css`
    margin-top: ${margin ? margin : ''};
    display: inline-block;
  `}
`
