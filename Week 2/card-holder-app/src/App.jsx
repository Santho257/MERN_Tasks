import CardElement, { Description, Img, Title } from "./components/CardElement";
import imgSrc from "./assets/londonstreet.jpg";
import FlexWrapper from "./components/CSS-In-JS/FlexWrapper";
import DynamicButton from "./components/CSS-In-JS/DynamicButton";
import CreateButton from "./components/CreateButton";
import CreateCard from "./components/CreateCard";
const App = () => {
    return (
        <>
            <FlexWrapper>
                <CreateButton/>
                <CreateCard />
            </FlexWrapper>
        </>
    );
}

export default App;
