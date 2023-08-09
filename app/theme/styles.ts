import semanticTokens from "@/app/theme/foundations/semanticTokens";

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: semanticTokens.colors.bgBodyColor.default,
      _dark: {
        bg: semanticTokens.colors.bgBodyColor._dark,
      }
    },
    // styles for the `a`
    a: {
      _hover: {
        textDecoration: 'none',
      },
    },
  },
}

export default styles