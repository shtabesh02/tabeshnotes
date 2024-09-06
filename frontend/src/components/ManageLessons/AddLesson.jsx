// frontend/src/components/Lessons/AddLesson.jsx
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addnewlesson } from "../../store/lessons";
import { loadCoursefromDB } from "../../store/courses";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

import './AddLesson.css'

const AddLesson = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const user_id = useSelector(state => state.session.user.id);
    const course_title = useSelector(state => state.courseReducer.courseDetails.title);
    const { course_id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addlesson = (e) => {
        e.preventDefault();
        const newlesson = {
            course_id,
            user_id,
            title,
            content,
            completed: false
        }
        if (content.trim() === '' || content.trim() === '<p><br></p>') {
            setErrors({ content: "Add the note!" })
            return;
        }

        dispatch(addnewlesson(newlesson, course_id))
            .then(() => {
                navigate(`/courses/${course_id}/managelessons`)
            })
            .catch(async (res) => {
                const data = await res.json();
                // if (data?.errors) {
                //     setErrors(data?.errors);
                // }
                setErrors(data?.errors);
            })
    }

    useEffect(() => {
        dispatch(loadCoursefromDB(course_id))
    }, [dispatch, course_id]);

    const module = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            // ['link', 'image', 'video', 'formula'],

            // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    }
    return (
        <>
            <div className="back2managelesson">
                <button onClick={() => navigate(`/courses/${course_id}/managelessons`)}>Back</button>
            </div>
            <div className="addalessoncontainer">
                <div className="addlesson1">
                    <h1>Add a new lesson to <span style={{color: 'green'}}> {course_title} </span>course</h1>
                    <form onSubmit={addlesson} className="addlessonform">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            {errors.title && <p className="errorcss">{errors.title}</p>}
                        </div>
                        {/* <div> */}
                            {/* <label htmlFor="content">Content</label> */}
                            {/* <textarea value={content} onChange={e => setContent(e.target.value)} name="lessoncontent" id="lessoncontent" cols="30" rows="10">Content</textarea> */}

                            <ReactQuill
                                modules={module}
                                theme='snow'
                                value={content}
                                onChange={(content) => setContent(content)} style={{ minHeight: '200px' }}
                                placeholder="Add the content of the lesson here..." />
                            {errors.content && <p className="errorcss">{errors.content}</p>}
                        {/* </div> */}
                        <div className="sbmtbtn">
                            <button>Add the lesson</button>
                        </div>

                        {/* <ReactQuill theme='snow' value={content} onChange={(content) => setContent(content)} style={{minHeight: '100px'}}/> */}
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddLesson