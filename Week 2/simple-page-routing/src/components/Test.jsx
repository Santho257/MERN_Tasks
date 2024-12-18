import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Test = () => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [count, setCount] = useState(0);
    const [answer, setAnswer] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
        setNum1(Math.floor(Math.random() * 1000));
        setNum2(Math.floor(Math.random() * 1000));
    }, [count]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(num1 + num2 == parseInt(answer)){
            navigator("correct", {state: {num1, num2, answer}});
            setAnswer("");
            setCount(count + 1);
        }
        else{
            navigator("wrong", {state: {num1, num2, answer}});
        }
    }

    return (
        <>
            <h2>Check your basic math</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='answer'>{num1} + {num2} =</label>
                <input type="number" name="answer" id="answer" value={answer} 
                onChange={e => setAnswer(e.target.value)}/>
                <button type="submit">Check</button>
            </form>
            <Outlet/>
        </>
    )
}

export default Test