import styled from "styled-components/native";



interface TextProps {
    small?: boolean,
    large?: boolean
}

const Text = styled.Text<TextProps>`
color: ${({theme}) => theme.TEXT_COLOR};
${({ small, large, block }: any) => {
		switch (true) {
			case small:
				return `font-size: 10px`;
			case large:
				return `font-size: 22px`;
			default:
                return `font-size: 16px`
		}
	}};
`

export default Text;