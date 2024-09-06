import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addcoursetoDB } from "../../store/courses";
import { useNavigate } from "react-router-dom";
import './AddCourse.css';

const AddCourse = () => {
    const currentuser = useSelector(state => state.session?.user);
    const [title, setTitle] = useState('');
    // const [instructor, setInstructor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const categories = ['Javascript', 'Python'];

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addthiscourse = (e) => {
        e.preventDefault();
        const mynewcourse = {
            user_id: currentuser.id,
            title,
            instructor: currentuser.firstName + ' ' + currentuser.lastName,
            category,
            description
        }
        dispatch(addcoursetoDB(mynewcourse))
            .then(() => {
                navigate(`/managecourses`)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(data.errors);
                }
            })
    }
    return (
        <>
            <div className="addnewcoursecontainer">
                <div className="back2mycourses">
                    <button onClick={() => navigate('/managecourses')}>Back</button>
                </div>
                <div className="addingnewcourse">
                    <h1>Add a course</h1>
                    <form onSubmit={addthiscourse} className="courseform">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            {errors.title && <p className="errorcss">{errors.title}</p>}
                        </div>
                        {/* <div>
                            <label htmlFor="instructor">Instructor</label>
                            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                            {errors.instructor && <p className="errorcss">{errors.instructor}</p>}
                        </div> */}
                        {/* <div>
                            <label htmlFor="category">Category</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                            {errors.category && <p className="errorcss">{errors.category}</p>}
                        </div> */}
                        <div>
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                                <option value="" disabled>Select the category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && <p className="errorcss">{errors.category}</p>}
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <p className="errorcss">{errors.description}</p>}
                        </div>
                        <div className="sbmtbtn">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCourse