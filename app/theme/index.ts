import {extendTheme, withDefaultColorScheme} from "@chakra-ui/react";
import styles from "@/app/theme/styles";
import colors from "@/app/theme/foundations/colors";
import layerStyles from "@/app/theme/foundations/layerStyles";
import semanticTokens from "@/app/theme/foundations/semanticTokens";
import config from "@/app/theme/foundations/config";
import Button from "@/app/theme/components/button";

const themeConfig = {
  styles,
  colors,
  config,
  semanticTokens,
  layerStyles,
  components: {
    Button
  },

}

const index = extendTheme(themeConfig, withDefaultColorScheme({ colorScheme: 'teal' }))

export default index

