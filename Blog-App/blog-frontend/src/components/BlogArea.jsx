import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitize from "sanitize-html";

const BlogArea = () => {
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const newContent = [];
        newContent.push({ type: "para", value: "" });
        setContent([...newContent]);
    }, []);

    const handleTextChange = (e, i) => {
        const newContent = [...content];
        newContent[i].value = sanitize(e.target.value, {
            allowedTags: ["b"],
            allowedAttributes: {}
        });
        setContent([...newContent])
    };

    const handleEnter = (e, i) => {
        if (e.code == "Enter") {
            console.log(content);
            addTop(i + 1);
            e.target.blur();
            e.preventDefault();
        }
        else if (e.code == "Backspace") {
            if (content[i].value == "") {
                deleteSect(i);
                e.preventDefault();
            }
        }
    }

    const changeType = (e, i) => {
        console.log(content)
        content[i].type = e.target.value;
        setContent([...content])
    }

    const addTop = (i) => {
        const newContent = [...content];
        newContent.splice(i, 0, { type: "para", value: "" });
        setContent([...newContent]);
    };

    const deleteSect = (i) => {
        if (content.length > 1) {
            const newContent = [...content];
            newContent.splice(i, 1);
            setContent([...newContent]);
        }
        else if (content.length == 1) {
            const newContent = [];
            newContent.push({ type: "para", value: "" });
            setContent([...newContent]);
        }
    };

    const handleImageChange = async (e, i) => {
        const fd = new FormData();
        fd.append("file", e.target.files[0]);
        fd.append("upload_preset", "blog_images");
        fd.append("cloud_name", "do3xgroki");
        try{
            const response = await axios.post(`https://api.cloudinary.com/v1_1/do3xgroki/image/upload`, fd);
            content[i].value = response.data.url;
            setContent([...content]);
        }
        catch(err){
            alert("Error in file Uploading");
            console.error(err);
        }
    }

    return (
        <>
            <section id="blog-area">
                <ContentEditable
                    className="title"
                    tagName="h3"
                    html={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {content.map((con, i) => (
                    <section className="content" key={i}>
                        <button className="small-button add top" onClick={() => addTop(i)}>
                            +
                        </button>
                        <article onChange={(e) => changeType(e, i)} className="type-area">
                            {(con.type != "image" || con.value == "") && <>
                                <input type="radio" name={`type${i}`} value="para" />Paragraph
                                <input type="radio" name={`type${i}`} value="head" />Heading
                                <input type="radio" name={`type${i}`} value="quote" />Quote
                            </>}
                            {con.value == "" && <><input type="radio" name={`type${i}`} value="image" />Image</>}
                        </article>
                        {con.type == "head" ? (
                            <ContentEditable
                                className="blog-head"
                                html={con.value}
                                tagName="h5"
                                onChange={(e) => handleTextChange(e, i)}
                                onKeyDown={(e) => handleEnter(e, i)} />
                        ) : con.type == "para" ? (
                            <ContentEditable
                                className="blog-para"
                                html={con.value}
                                tagName="p"
                                onChange={(e) => handleTextChange(e, i)}
                                onKeyDown={(e) => handleEnter(e, i)} />
                        ) : con.type == "quote" ? (
                            <p>
                                <ContentEditable
                                    className="blog-quote"
                                    html={con.value}
                                    tagName="i"
                                    onChange={(e) => handleTextChange(e, i)}
                                    onKeyDown={(e) => handleEnter(e, i)} />
                            </p>
                        ) : (
                            con.value != "" ?
                                <section className="blog-img">
                                    <img src={con.value} alt="It should be an image" />
                                </section>
                                :
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, i)} />
                        )}
                        <button
                            className="small-button add bottom"
                            onClick={() => addTop(i + 1)}
                        >
                            +
                        </button>
                        <button
                            className="small-button delete"
                            onClick={() => deleteSect(i)}
                        >
                            -
                        </button>
                    </section>
                ))}
            </section>
        </>
    );
};

export default BlogArea;
