import CardElement, { Description, Img, Title } from "./components/CardElement";
import imgSrc from "./assets/londonstreet.jpg";
import FlexWrapper from "./components/CSS-In-JS/FlexWrapper";
const App = () => {
    const title = "Mindsets of People";
    const description = `Mindset of a person can be classified into three types based on their reaction to something: Aggressive, Passive & Neutral`
    return (
        <>
            <FlexWrapper>
                <CardElement>
                    <Img src={imgSrc} />
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </CardElement>
                <CardElement>
                    <Img src={imgSrc} />
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </CardElement>
                <CardElement>
                    <Img src={imgSrc} />
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </CardElement>
                <CardElement>
                    <Img src={imgSrc} />
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </CardElement>
            </FlexWrapper>
        </>
    );
}

export default App;
