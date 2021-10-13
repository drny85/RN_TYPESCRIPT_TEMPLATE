import styled from "styled-components/native";



interface TextProps {
    small?: boolean,
    large?: boolean,
	title?: boolean,
	caption?: boolean
}

const Text = styled.Text<TextProps>`
color: ${({theme}) => theme.TEXT_COLOR};
font-family:'montserrat'
${({ small, large, block }: any) => {
		switch (true) {
			case small:
				return `font-size: 12px`;
			case large:
				return `font-size: 24px`;
			default:
                return `font-size: 16px`
		}
	}};
	${({ title, caption }: any) => {
		switch (true) {
			case title:
				return `font-family: montserrat-bold`;
			case caption:
				return `font-style: 'italic`;
			default:
                return `font-weight: 500`
		}
	}};
`

export default Text;