// import original module declarations
import 'styled-components/native';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
        mode: string;
        BACKGROUND_COLOR: string;
        TEXT_COLOR: string;
        BUTTON_TEXT_COLOR: string;
        PRIMARY_BUTTON_COLOR: string;
        SHADOW_COLOR: string;
        SECONDARY_BUTTON_COLOR: string;
        STATUS_BAR: string;
    
  }
}