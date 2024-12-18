import CardElement from "./components/CardElement";
import imgSrc from "./assets/mindsets.png";
const App = () => {
    const title = "Mindsets of People";
    const description = `Mindset of a person can be classified into three types based on their reaction to something: Aggressive, Passive & Neutral`
    return (
        <>
            <CardElement imgSrc={imgSrc} title={title} description={description} />
        </>
    );
}

export default App;
