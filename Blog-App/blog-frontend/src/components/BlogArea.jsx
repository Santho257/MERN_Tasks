import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitize from "sanitize-html";
import { BASE_URL } from "../constants";
import { debounce } from "../utils/debounce";

const BlogArea = ({ id }) => {
    const [content, setContent] = useState([]);
    const [edited, setEdited] = useState([]);
    const [blogId, setBlogId] = useState(id);
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);
    const [focIndex, setFocIndex] = useState(0);
    const focRef = createRef();

    useEffect(() => {
        updateBlog();
    }, [edited]);

    useEffect(() => {
        console.log("fetchBlog")
        fetchBlog();
    }, [blogId, count]);

    useEffect(() => {
        const textElem = focRef.current?.childNodes[0];
        if (textElem) {
            textElem.focus();
            const range = document.createRange(); // Create a range object
            const selection = window.getSelection(); // Get the current selection object
            range.selectNodeContents(textElem); // Select all contents of the element
            range.collapse(false); // Collapse the range to the end of the content
            selection.removeAllRanges(); // Remove any previous selection
            selection.addRange(range);
        }
    }, [focIndex]);

    const fetchBlog = async () => {
        if (blogId) fetchBlogWithId();
        else {
            try {
                const create = await axios.post(`${BASE_URL}/blogs`, {
                    title: "New Blog",
                    content: [{
                        type: "para",
                        value: ""
                    }]
                }, {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ODc2NzdkMDg1Nzk1YmJmNzFkNTI0MyIsInN1YiI6IlRlc3QgVXNlciJ9.N0hVIZ-S4jvaL6k_uN4J1zP6FdPCxcdt7cqkgxreEdY"
                    }
                });
                setBlogId(create.data.data.id);
            } catch (error) {
                console.log(error);
                console.log(error.errors)
                alert(error.message);
            }
        }
    }

    const fetchBlogWithId = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/blogs/${blogId}`, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ODc2NzdkMDg1Nzk1YmJmNzFkNTI0MyIsInN1YiI6IlRlc3QgVXNlciJ9.N0hVIZ-S4jvaL6k_uN4J1zP6FdPCxcdt7cqkgxreEdY"
                }
            });
            setContent(response.data.data.content);
            setTitle(response.data.data.title);
            setFocIndex(content.length - 1);
        } catch (error) {
            console.log(error);
            console.log(error.errors)
            alert(error.message);
        }
    }

    const updateBlog = async () => {
        if(!blogId) return;
        try {
            const response = await axios.patch(`${BASE_URL}/blogs/${blogId}`, { content: edited }, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ODc2NzdkMDg1Nzk1YmJmNzFkNTI0MyIsInN1YiI6IlRlc3QgVXNlciJ9.N0hVIZ-S4jvaL6k_uN4J1zP6FdPCxcdt7cqkgxreEdY"
                }
            })
            if(response.data.success){
                setCount(count + 1);
            }
        }
        catch (error) {
            console.log(error.errors);
        }
    }
    const handleTextChange = debounce((e, i) => {
        const newContent = [...content];
        newContent[i].value = sanitize(e.target.value, {
            allowedTags: ["b"],
            allowedAttributes: {}
        });
        setEdited([...newContent])
    }, 500);

    const handleEnter = (e, i) => {
        if (e.code == "Enter") {
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
        setEdited([...content])
    }

    const addTop = (i) => {
        const newContent = [...content];
        newContent.splice(i, 0, { type: "para", value: "" });
        setEdited([...newContent]);
        setFocIndex(i);
    };

    const deleteSect = (i) => {
        if (content.length > 1) {
            const newContent = [...content];
            newContent.splice(i, 1);
            setFocIndex(i - 1);
            setEdited([...newContent]);
        }
        else if (content.length == 1) {
            const newContent = [];
            newContent.push({ type: "para", value: "" });
            setEdited([...newContent]);
        }
    };

    const handleImageChange = async (e, i) => {
        const fd = new FormData();
        fd.append("file", e.target.files[0]);
        fd.append("upload_preset", "blog_images");
        fd.append("cloud_name", "do3xgroki");
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/do3xgroki/image/upload`, fd);
            content[i].value = response.data.url;
            setEdited([...content]);
        }
        catch (err) {
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
                    onKeyDown={(e) => {
                        if (e.code == "Enter") {
                            e.preventDefault();
                            addTop(0);
                            e.target.blur();
                        }
                    }}
                />
                {content.map((con, i) => (
                    <section className="content" key={content.id || i}>
                        <article onChange={(e) => changeType(e, i)} className="type-area">
                            <input type="radio" name={`type${i}`} value="para" />Paragraph
                            <input type="radio" name={`type${i}`} value="heading" />Heading
                            <input type="radio" name={`type${i}`} value="quote" />Quote
                            <input type="radio" name={`type${i}`} value="image" />Image
                        </article>
                        <article ref={focIndex == i ? focRef : null} >
                            {con.type == "heading" ? (
                                <ContentEditable
                                    className="blog-head"
                                    html={con.value}
                                    tagName="h5"
                                    onChange={(e) => handleTextChange(e, i)}
                                    onKeyDown={(e) => handleEnter(e, i)}
                                />
                            ) : con.type == "para" ? (
                                <ContentEditable
                                    className="blog-para"
                                    html={con.value}
                                    tagName="p"
                                    onChange={(e) => handleTextChange(e, i)}
                                    onKeyDown={(e) => handleEnter(e, i)}
                                />
                            ) : con.type == "quote" ? (
                                <p className="blog-quote">
                                    <ContentEditable
                                        html={con.value}
                                        tagName="i"
                                        onChange={(e) => handleTextChange(e, i)}
                                        onKeyDown={(e) => handleEnter(e, i)}
                                    />
                                </p>
                            ) : (
                                con.value != "" ?
                                    <section className="blog-img">
                                        <img src={con.value} alt="It should be an image" />
                                    </section>
                                    :
                                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, i)} />
                            )}
                        </article>
                        {con.type == "image" && <button
                            className="small-button add bottom"
                            onClick={() => addTop(i + 1)}
                        >
                            +
                        </button>}
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
