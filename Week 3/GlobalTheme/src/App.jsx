import Link from "./components/ui/Link/Link"
import Section from "./components/ui/Section/Section"
import ThemeSetter from "./components/ThemeSetter/ThemeSetter"
import Button from "./components/ui/Button/Button"
import { ThemeContext } from "./contexts/ThemeContext"

const App = () => {
	return (
		<>
			<ThemeSetter />
			<Section>
				<Section>
					<h1>Hello Everyone</h1>
					<Section>
						<p>In this passage, we are gonna "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."</p>
						<p><Link href="https://www.lipsum.com/">To Learn more</Link></p>
					</Section>
					<Button>Click Me</Button>
				</Section>
				<ThemeContext.Provider value={{ darkTheme: false }}>
					<Section>
						<h1>Hello Everyone</h1>
						<Section>
							<p>In this passage, we are gonna "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."</p>
							<p><Link href="https://www.lipsum.com/">To Learn more</Link></p>
						</Section>
						<Button>Click Me</Button>
					</Section>
				</ThemeContext.Provider>
				<Section>
					<h1>Hello Everyone</h1>
					<Section>
						<p>In this passage, we are gonna "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."</p>
						<p><Link href="https://www.lipsum.com/">To Learn more</Link></p>
					</Section>
					<Button>Click Me</Button>
				</Section>
			</Section>
		</>
	)
}

export default App
