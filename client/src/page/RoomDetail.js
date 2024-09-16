import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiMotelsRead, apiMotelsUpdate, apiNewsUpdate, apiReviewsCreate, apiReviewsDelete, apiReviewsRead, apiUsersRead } from '../axios/axios'
import Header from '../components/Header'
import '../assets/scss/home/RoomDetail.scss'
import { image0, image1, image2, image5, image7 } from '../assets/img/panner'
import Footer from '../components/Footer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import '../assets/scss/admin/Update.scss'

function Rooms() {
    const accountinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const room = useLocation().state
    const [motels, setMotels] = useState([])
    const [value, setValue] = useState()
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [clickedRating, setClickedRating] = useState(0);
    const [customers, setCustomers] = useState([])
    const [reviews, setReviews] = useState([])
    const [replyInput, setReplyInput] = useState('');
    const [btnValue, setBtnValue] = useState('all')

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)
    const customer = customers.filter((item) => {
        return item.username._id === accountinfo._id
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        const review = await apiReviewsRead()
        const room = await apiMotelsRead()
        setMotels(room.motels)
        setReviews(review.reviews)
        setCustomers(res.user)
    }
    const handleRatingChange = (value) => {
        setRating(value);
        setClickedRating(value);
    };
    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };
    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (customer.length > 0 || accountinfo.username === 'nhanguyen') {
                const res = await apiReviewsCreate({
                    username: accountinfo._id,
                    room: room._id,
                    desc: value,
                    star: clickedRating,
                    date: ngay
                })
                setValue()
                setClickedRating(0)
                fetchData()
                console.log(res)
            }
            console.log("Rating:", rating, 'content', value);
        } catch {
            alert('Trước tiên hãy cùng trãi nghiệm dịch vụ của chúng tôi')
        }

    };

    const handleRadioChange = (event) => {
        setClickedRating(event.target.getAttribute('data-value'))
    }

    // const stars = [1, 2, 3, 4, 5].map((starValue) => (
    //     <span
    //         key={starValue}
    //         className={`
    //         star
    //         ${starValue <= (hoverRating || clickedRating) ? "active" : ""}
    //         ${starValue <= clickedRating ? "clicked" : ""}
    //       `}
    //         onClick={() => handleRatingChange(starValue)}
    //         onMouseEnter={() => handleMouseEnter(starValue)}
    //         onMouseLeave={() => handleMouseLeave()}
    //     >
    //         <i class="bi bi-star-fill cmt-content-item fs-4"></i>
    //     </span>
    // ))
    const handlecheck = () => {
        console.log('ugfwiugwio');
        
        if (window.confirm('Hãy cập nhật thông tin của bạn')) {
            return window.location.href = '/user/profile'
        }
    }

    const renderButton = () => {
        const infUsers = customers.filter((infUser) => infUser.username._id === accountinfo._id)
        console.log(infUsers.length);


        if (room.status === null || room.status === undefined) {
            if (infUsers.length > 0) {
                return <Link class="btn btn-sm btn-primary rounded py-2 px-5 rounded-2 ms-5" to={'/bill'} state={room} >Đặt phòng</Link>
            }
                return <button className='btn btn-sm btn-primary rounded py-2 px-5 rounded-2 ms-5' onClick={() => handlecheck()}>Đặt phòng</button>
                // if (window.confirm('Hãy cập nhật thông tin của bạn')) {
                //     return window.location.href = '/user/profile'
                // }

            // return <Link class="btn btn-sm btn-primary rounded py-2 px-5 rounded-2 ms-5" to={'/bill'} state={room} >Đặt phòng</Link>

        } else if (room.status === true) {
            return <button className="btn btn-sm btn-dark rounded py-2 px-5 ms-5" disabled>Đã được đặt</button>

        } else if (room.status === false) {
            return <button className="btn btn-sm btn-dark rounded py-2 px-5 ms-5" disabled>Chờ phản hồi</button>

        }
    }



    const deleteProduct = async id => {
        if (window.confirm("Delete")) {
            await apiReviewsDelete(id)
            fetchData()
        }
    }
    const star = (item) => {
        const listStar = []
        for (let i = 1; i <= 5; i++) {
            listStar.push(i <= item.star ? <small class="bi bi-star-fill text-primary ms-1"></small> : <small class="bi bi-star-fill text-secondary ms-1"></small>)
        }
        return listStar
    }
    // phân trang 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const rooms = motels.filter((item) => {
        return item.kind === room.kind && item._id !== room._id
    });
    const totalItems = rooms.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rooms.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // reply


    const [showAll, setShowAll] = useState(false)
    const [reviewslices, setReviewsLices] = useState([])
    const reviewslice = reviews.filter((item) => item.room._id === room._id)
    const itemToShow = showAll ? reviewslice : reviewslice.slice(0, 2)

    const itemShows = () => {
        const reviewslice = reviews.filter((item) => item.room._id === room._id)
        const value = btnValue

    }
    // console.log(itemShows(), 'ji');

    const [showReplyForm, setShowReplyForm] = useState(false);
    const replyFrom = () => {
        setShowReplyForm(!showReplyForm)
    }
    const replySubmit = async (item) => {
        await apiNewsUpdate({
            _id: item._id,
            reply: {
                title: accountinfo.username,
                desc: replyInput,
                date: ngay
            }
        })
        setReplyInput('')
        setShowReplyForm(false)
        fetchData()

    }

    const filteredReviews = reviews?.filter((item) => {
        if (btnValue === 'all') {
            return item.room._id === room._id;
        } else {
            return item.room._id === room._id && item.star === parseInt(btnValue);
        }
    });

    return (
        <div className="room-wrapper ">
            <div>
                <Header />
            </div>
            <div className='card news-wrapper'>
                <div className=' container-xxl mt mb-5 '>
                    <div className='row'>
                        <div class="col-8">
                            <div class="card-body reactqill-fix">
                                <img src={room.image} class="card-img-top img-fluid w-100 card shadow" alt='...' />
                                <div class="d-flex align-items-center mb-4 mt-4">
                                    <h1 class="mb-0 ">{room?.title}</h1>
                                    <div class="ps-2 fs-5">
                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap pb-4 m-n1">
                                    <small class="bg-light rounded py-1 px-3 m-1"><i class="bi bi-eye-fill text-primary me-3"></i>Bed</small>
                                    <small class="bg-light rounded py-1 px-3 m-1"><i class="bi bi-droplet-half text-primary me-3"></i>Bath</small>
                                    <small class="bg-light rounded py-1 px-3 m-1"><i class="bi bi-wifi text-primary me-3"></i>Wifi</small>
                                    <small class="bg-light rounded py-1 px-3 m-1"><i class="bi bi-tv text-primary me-3"></i>TV</small>
                                    <small class="bg-light rounded py-1 px-3 m-1"><i class="bi bi-fan text-primary me-3"></i>AC</small>
                                </div>
                                {/* <h6 className='fs-5'> Giới thiệu</h6> */}
                                <p class="card-text">
                                    <ReactQuill value={room.desc} readOnly={true} theme="bubble" />
                                </p>
                                <div className='price fs-5 mb-2'>
                                    Giá: {Intl.NumberFormat('vi-VN').format(room.price)} VNĐ/Tháng
                                </div>
                            </div>
                            <div className='btn w-100 pt-3'>
                                {renderButton()}
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className=' mt-4 '>
                                <div className='card shadow-sm'>
                                    <div className='d-flex p-2'>
                                        <img src={image7} className='img rounded-0 rounded-circle avatar '></img>
                                        <p className='mx-3 mt-2 fw-bold fs-5'>Nhã Nguyễn<i class="bi bi-check-circle mx-4 "></i></p>
                                    </div>
                                    <label className='text-right mx-3'>Liên hệ trực tiếp</label>
                                    <div className='card p-2 border m-3 row'>
                                        <div className='col-7 fs-5 fst-ilatic  ' >
                                            <i class="bi bi-telephone-fill mx-3 tick fs-5 "> </i>
                                            0396984478
                                        </div>
                                    </div>
                                    <div className='d-flex mx-4 ms-auto '>
                                        <i class="bi bi-facebook p-2 fs-1 facebook text-primary"></i>
                                        <i class="bi bi-chat-dots-fill p-2 fs-1 chat text-primary"></i>
                                        <i class="bi bi-telegram p-2 fs-1 telegram text-primary"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-light p-4 mb-5 wow fadeInUp card mt-2 bg-ligth" data-wow-delay="0.1s" >
                                <h4 class="section-title text-start mb-4">
                                    Loại
                                </h4>
                                <Link class="carousel-item d-block position-relative mb-3" to={'/room/phong-ghep'}>
                                    <img class="img-fluid img-kind bg-secondary" src={image1} alt="" />
                                    <div class=" carousel-caption d-flex position-absolute  top-0 start-0 w-100 h-100 p-3 ">
                                        <h5 class="text-white m-0 mt-auto fw-bold fs-5">
                                            Phòng đôi
                                        </h5>
                                    </div>
                                </Link>
                                <Link class="carousel-item d-block position-relative" to={'/room/phong-don'} >
                                    <img class="img-fluid img-kind" src={image2} alt="" />
                                    <div class="carousel-caption d-flex position-absolute top-0 start-0 w-100 h-100 p-3 " >
                                        <h5 class="text-white m-0 mt-auto fw-600">
                                            Phòng đơn
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                            <div className=' mt-4 '>
                                <div className='card shadow-sm'>
                                    <div className='d-flex p-2'>
                                        <p className='mx-3 mt-2 fw-bold fs-5'>Địa chỉ<i class="bi bi-check-circle mx-4 "></i></p>
                                    </div>

                                    <label className='text-right mx-3 p-2'><i class="bi bi-geo-alt-fill "></i> Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ, Việt Nam</label>
                                    <div className='card p-2 border-primary m-3 row'>
                                        <div className='' >
                                            <iframe class="position-relative rounded w-100 h-100 map_info"
                                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15676.733646510674!2d105.7736131!3d10.0346448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08919f8927df5%3A0x28c8fc7a8cc25dc7!2zTkhBzIAgVFJPzKMgU0lOSCBWScOKTiAyMTgvMTdCIFRIxJAgQ8OCzIBOIFRIxqA!5e0!3m2!1svi-VN!2sus!4v1647148616358!5m2!1svi-VN!2sus"
                                                frameborder="0" allowfullscreen="" aria-hidden="false"
                                                tabindex="0" ></iframe>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='row filer-same '>
                            <div className='container-xxl pb-5'>
                                <div className='container'>
                                    <div class="text-start wow fadeInUp" data-wow-delay="0.1s">
                                        <h6 class="section-title text-start text-primary text-uppercase ms-3 mt-3"></h6>
                                        <h1 class="mb-3">Kết quả <span class="text-primary text-uppercase">liên quan</span></h1>
                                    </div>
                                    <div className='card px-2'>
                                        <div className='row d-flex filer-same-content'>
                                            {currentItems.map((item, index) => (
                                                <div class="col-lg-4 col-md-6 wow fadeInUp filer-same-item" data-wow-delay="0.1s">
                                                    <div class="room-item shadow rounded overflow-hidden ">
                                                        <div className='row'>
                                                            <div class="col-6 position-relative ">
                                                                <img class="img-fluid img" src={item.image} alt="" />
                                                            </div>
                                                            <div class="col-6 mt-2">
                                                                <div class="d-inline-block justify-content-between mb-3">
                                                                    <h5 class="mb-0">{item.title}</h5>
                                                                    <div class="ms-0">
                                                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                                                        <small class="bi bi-star-fill text-primary ms-1"></small>
                                                                    </div>
                                                                    <div className=''>

                                                                        <ReactQuill theme="bubble" value={item.desc} readOnly={true} className='react-fix mb-3 p-0 ' style={{ height: '75px' }} />
                                                                    </div>
                                                                    <small class=" start-0 translate-middle-y bg-primary text-white rounded p-2 mt-4  w-auto">{Intl.NumberFormat('vi-VN').format(item.price)} VNĐ/Tháng</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2 ms-2'>
                                                            <div class="d-flex mb-2">
                                                                <small class="border-end me-3 pe-3 py-2 w-auto"><i class="bi bi-house-fill text-primary me-2"></i>{item.kind}</small>
                                                                <small class="border-end me-3 pe-3 py-2 w-auto" ><i class="bi bi-geo-alt-fill text-primary me-2"></i>{item.area}</small>
                                                                <small class="me-2 py-2 w-auto"><i class="bi bi-arrows text-primary "></i>{item.size}</small>
                                                            </div>
                                                            <Link class="btn btn-sm btn-primary rounded py-2" to={`/room/${item._id}`} state={item} >Xem ngay</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pagination ms-auto me-2">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <button className='btn btn-outline-primary mt-1 mb-2' key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab-4" class=" col-8 tab-pane fade px-4 active show">
                            <div class="mb-4">
                                <h4 class="mb-4">{reviews?.filter((item) => {
                                    return item.room._id === room._id
                                }).length} Nhận xét</h4>
                                <div className='d-lex mb-2'>
                                    <button className='btn btn-outline-primary px-4' onClick={() => setBtnValue('all')}>Tất cả</button>
                                    <button className='btn btn-outline-primary ms-1 px-4' onClick={() => setBtnValue('5')}>5 sao</button>
                                    <button className='btn btn-outline-primary ms-1 px-4' onClick={() => setBtnValue('4')}>4 sao</button>
                                    <button className='btn btn-outline-primary ms-1 px-4' onClick={() => setBtnValue('3')}>3 sao</button>
                                    <button className='btn btn-outline-primary ms-1 px-4' onClick={() => setBtnValue('2')}>2 sao</button>
                                    <button className='btn btn-outline-primary ms-1 px-4' onClick={() => setBtnValue('1')}>1 sao</button>
                                </div>
                                {filteredReviews?.map((item) => {
                                    return (
                                        <div class="d-flex mb-4 cmt-content">
                                            <img src={image7} class="img-fluid rounded avatar" alt='' />
                                            <div class="ps-3">
                                                <h6>{item.username.username} <small class="text-body fw-normal fst-italic">{item.date}</small></h6>
                                                <div class="mb-0">
                                                    <div class="ps-2 fs-5">
                                                        {star(item)}
                                                    </div>
                                                </div>
                                                <ReactQuill value={item.desc} readOnly={true} theme="bubble" className='cmt-reviews ' style={{ height: 'auto' }} />

                                                <button className='btn text-primary ' onClick={() => replyFrom()}><i class="bi bi-reply-fill me-2"></i> Reply</button>
                                                {(accountinfo.username === 'nhanguyen' || accountinfo._id == item.username._id) ?
                                                    <button type='delete' className='btn text-danger' onClick={() => deleteProduct(item._id)} ><i class="bi bi-trash3-fill grap-2 text-danger"></i> Delete</button>
                                                    :
                                                    ''
                                                }
                                                {item?.reply?.length > 0 ? item.reply.map((item) => {
                                                    return <div className="reply-form mt-2">
                                                        <div class="d-flex mb-2 cmt-content">
                                                            <img src={image7} class="img-fluid rounded avatar" />
                                                            <div class="ps-3">
                                                                <h6>{item.reply.title} </h6>
                                                                <h6 className='h6 text-body fw-normal fst-italic '><i class="bi bi-reply-fill me-2"></i>Reply {item.username.username}</h6>
                                                            </div>
                                                        </div>
                                                        <ReactQuill theme='bubble' value={item.reply.desc} rows='3' />
                                                    </div>
                                                })

                                                    :
                                                    ''
                                                }

                                                {showReplyForm && (
                                                    <div className="reply-form mt-2">
                                                        <div class="d-flex mb-2 cmt-content">
                                                            <img src={image7} class="img-fluid rounded avatar" />
                                                            <div class="ps-3">
                                                                <h6>{accountinfo.username} </h6>
                                                                <h6 className='h6 text-body fw-normal fst-italic '><i class="bi bi-reply-fill me-2"></i>Reply {item.username.username}</h6>
                                                            </div>
                                                        </div>
                                                        <ReactQuill theme='snow' value={replyInput} onChange={setReplyInput} rows='3' />
                                                        <button className="btn btn-primary mt-2 " onClick={replySubmit(item)}>Send</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className='row p-2 mt-2'>
                                    {showAll ?
                                        <button className='text-center text-primary bordered fs-5 btn ' onClick={() => setShowAll(false)}>Ẩn bớt...</button>
                                        :
                                        <button className='text-center text-primary bordered fs-5 btn' onClick={() => setShowAll(true)}>Xem thêm...</button>
                                    }
                                </div>

                            </div>
                            <div class="">
                                <h4 class="mb-4">Để lại nhận xét</h4>
                                <form onSubmit={handleSubmit}>
                                    <div class="d-flex mb-2 cmt-content">
                                        <img src={image7} class="img-fluid rounded avatar" />
                                        <div class="ps-3">
                                            <h6>{accountinfo.username} </h6>
                                            <div class="col-12 d-flex align-items-center">
                                                <h6 class="mb-0 me-2">Rate Me:</h6>
                                                <div id="halfstarsReview" class="fs-4 me-2 cmt-content-star text-secondary" rating="true" >
                                                    <div class="__cl-c-vote___">
                                                        <input type="radio" name="ratStarComment" id="comment-star-5" data-value="5" onChange={handleRadioChange} />
                                                        <label title="5" htmlFor="comment-star-5"></label>
                                                        <input type="radio" name="ratStarComment" id="comment-star-4" data-value="4" onChange={handleRadioChange} />
                                                        <label title="4" htmlFor="comment-star-4"></label>
                                                        <input type="radio" name="ratStarComment" id="comment-star-3" data-value="3" onChange={handleRadioChange} />
                                                        <label title="3" htmlFor="comment-star-3"></label>
                                                        <input type="radio" name="ratStarComment" id="comment-star-2" data-value="2" onChange={handleRadioChange} />
                                                        <label title="2" htmlFor="comment-star-2"></label>
                                                        <input type="radio" name="ratStarComment" id="comment-star-1" data-value="1" onChange={handleRadioChange} />
                                                        <label title="1" htmlFor="comment-star-1"></label>
                                                    </div>
                                                    {/* {stars} */}
                                                </div>
                                                <input type="text" value={clickedRating} readonly="" id="halfstarsInput" class="border-0 bg-transparent" fdprocessedid="a09qts" />
                                            </div>
                                        </div>
                                    </div>
                                    <ReactQuill theme='snow' value={value} onChange={setValue} />
                                    <button type="submit " className='btn btn-primary mt-2'>Gửi đánh giá</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div >
    );
}

export default Rooms;