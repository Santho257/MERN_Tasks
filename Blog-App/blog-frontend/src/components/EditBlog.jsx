import axios from "axios";
import React, { createRef, useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitize from "sanitize-html";
import { BASE_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Section from "../ui/Section/Section";
import Button from "../ui/Button/Button";

const EditBlog = () => {
    const navi = useNavigate();
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState([]);
    const [published, setPublished] = useState(false);
    const [changes, setChanges] = useState(false);
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    const [count, setCount] = useState(0);
    const [focIndex, setFocIndex] = useState(0);
    const focRef = createRef();

    useEffect(() => {
        fetchBlog();
    }, [id, count]);

    
    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setContent(response.data.data.content);
            setTitle(response.data.data.title);
            setPublished(response.data.data.published); 
        } catch (error) {
            console.log(error);
            console.log(error.errors);
            if (error.response?.data?.status == 404) navi("/404")
            }
    }

    useEffect(() => {
        const textElem = focRef.current?.childNodes[0];
        if (textElem) {
            textElem.focus();
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(textElem);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [focIndex]);

    const updateBlog = async () => {
        try {
            const response = await axios.patch(`${BASE_URL}/blogs/${id}`, { title, content }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.data.success) {
                setCount(count + 1);
            }
        }
        catch (error) {
            console.log(error.errors);
        }
    }
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
        content[i].type = e.target.value;
        setContent([...content])
    }

    const addTop = (i) => {
        const newContent = [...content];
        newContent.splice(i, 0, { type: "para", value: "" });
        setContent([...newContent]);
        setFocIndex(i);
    };

    const deleteSect = (i) => {
        if (content.length > 1) {
            const newContent = [...content];
            newContent.splice(i, 1);
            setFocIndex(i - 1);
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
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/do3xgroki/image/upload`, fd);
            content[i].value = response.data.url;
            setContent([...content]);
        }
        catch (err) {
            console.error(err);
        }
    }

    const publish = async () => {
        try {
            const response = await axios.patch(`${BASE_URL}/blogs/${id}`, { published: !published }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.data.success) {
                setPublished(prev => !prev);
            }
        }
        catch (error) {

        }
    }
    const deleteBlog = async () => {
        const confirmation = confirm("The blog will be permanently deleted! If you don't want it try to unpublish!")
        if (!confirmation) return;
        try {
            const response = await axios.delete(`${BASE_URL}/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.data.success) {
                navi("/blogs")
            }
        }
        catch (error) {
            console.log(error.response)
        }
    }

    return (
        <>
            <Section id="blog-area">
                <ContentEditable
                    className="title"
                    tagName="h3"
                    html={title ?? ""}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.code == "Enter") {
                            e.preventDefault();
                            addTop(0);
                        }
                    }}
                />
                {content.map((con, i) => (
                    <Section className="content" key={content.id || i}>
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
                                        onKeyDown={(e) =>{ handleEnter(e, i)}}
                                    />
                                </p>
                            ) : (
                                con.value != "" ?
                                    <Section style={{ width: "80%" }} className="blog-img">
                                        <img src={con.value} alt="It should be an image" />
                                    </Section>
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
                    </Section>
                ))}
                <Section>
                    <Button style={{ backgroundColor: "green" }} onClick={publish}>{published ? "Unpublish" : "Publish"}</Button>
                    <Button style={{ backgroundColor: "green" }} onClick={updateBlog}>Save</Button>
                    <Button style={{ backgroundColor: "red" }} onClick={deleteBlog}>Delete</Button>
                </Section>
            </Section>
        </>
    );
};

export default EditBlog;
