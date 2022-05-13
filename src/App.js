import React, { useEffect, useRef, useState,useMemo } from "react";
import {getStorage, uploadBytes, ref, getDownloadURL} from "firebase/storage";
import { collection, getDocs, deleteDoc, doc, onSnapshot, getDoc, query, where, addDoc,orderBy, limit,} from 'firebase/firestore';
import "./App.css";
import Video from "./components/Video";
import {db} from "./firebase";

function App() {
  const [content, setContent] = useState('');
  const [videos, setVideos] = useState([]);
  const [file_name, setFile_name] = useState([]);
  const [selectedVideos, setSelectedVideo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let unSub = null;
  useEffect(() => {
    (async () => {
      const collectionRef = collection(db, 'videos');
      unSub = onSnapshot(collectionRef, (snapShot) => {
          const localMessage = [];
          snapShot.forEach(doc => {
              localMessage.push({
                  id: doc.id,
                  content: doc.data().content,
                  date: doc.data().date,
                  urlVideo:doc.data().urlVideo
              });
          });
          setVideos(localMessage);
      });
      window.scrollTo(0, 1000000);
  })();
  }, []);

  const videoChange = (e) => {
    if (e.target.files) {
        const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
        setSelectedVideo((prevVideos) => prevVideos.concat(fileArray));
        setFile_name(e.target.files[0]);
    }
}

const renderVideos = (sources) => {
  return sources?.map((films, index) => {
      return (<div className="w-[600px] max-w-[100vw] h-auto max-h-[600px] relative" key={index}>
          <video className="w-auto max-w-[100vw] h-auto object-cover shadow" controls>
            <source src={films}  type="video/mp4" />
            <source src={films}  type="video/ogg" />
          </video>
      </div>)
  })
};

const upVideo = async (e) => {
  e.stopPropagation();
  const storage = getStorage();
  const urlVideo = []
  try {
    const fileName = `video/${Date.now()}video.mp4`;
    const myRef = ref(storage, fileName);//tao ref
    await uploadBytes(myRef, file_name, fileName);
    //lưu lại file vào firestore
    const pathRef = ref(storage, fileName);
    const url = await getDownloadURL(pathRef);
    urlVideo.push(url);
  } catch (e) {
      alert("lỗi")
  }

  const collectionRef = collection(db, 'videos');
    await addDoc(collectionRef, {
        content:content,
        date: new Date(), 
        urlVideo:urlVideo[0],
    });

  setShowModal(false);
  setContent('');
  setFile_name([]);
  setSelectedVideo([]);
}

console.log(file_name);
  return (
    <div
      id="focus"
      tabIndex="1"
      className="container flex flex-col snap-y snap-mandatory overflow-scroll h-screen overflow-x-hidden"
    >
      {/* <div className="w-20 h-20 bg-blue-500 fixed bottom-20 z-[100] left-10 rounded-full flex justify-center items-center" onClick={() => setShowModal(true)}>
        <p className="" >up Video</p>
      </div> */}
      {videos.map((video) => (
        <Video data={video} />
      ))}
      {showModal ? (
        <>
          <div
            className="justify-center z-[1200] items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-[100vw] my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-[600px] relative p-6 flex-auto">
                  <div className="w-full flex justify-between pt-4 ">
                      <div className="flex ">
                          <img className="w-10 h-10 rounded-full object-cover" src={1 == 2 ? null : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"} alt="" />
                          <div className=" ml-2">
                              <h4 className=" -mt-1 font-medium">Hà Đăng Sinh</h4>
                          </div>
                      </div>

                  </div>
                  <div className="w-full mt-4 ">
                      <textarea className="w-full h-40 mx-auto px-4 pt-2 mt-1.5" name="content" value={content} placeholder="Bạn muốn chia sẻ điều gì ?" onChange={(evt) => { setContent(evt.target.value); }}></textarea>
                  </div>
                  <div className="w-full h-auto ">
                      <div className="w-full">
                          <label className=" cursor-pointer mt-2" for="video" >
                              <div className=" flex pr-10">
                                  <input className=" hidden invisible" onChange={videoChange} accept="video/*" id="video" type="file" />
                                  <p className="mt-2 ml-2" >select Video</p>
                              </div>
                          </label>
                      </div>
                      <div className="w-full h-full max-w-[100vw] space-x-4 overflow-x-auto  pt-2 pr-2 ml-2">
                          {selectedVideos && (
                              <div className="w-max space-x-4 flex">
                                  {renderVideos(selectedVideos)}
                              </div>
                          )}
                      </div>
                  </div>
                  {/* <div className="w-full ">
                      {showShare && (<button className="w-9/12 h-10 rounded lg:mx-24 mx-10 bg-yellow-500 my-2 text-black font-semibold" onClick={uploadImages}>Chia sẻ</button>)}
                  </div> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>upVideo()}
                  >
                    Chia sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export const useElementOnScreen = (options, targetRef) => {
  const [isVisibile, setIsVisible] = useState();
  const callbackFunction = (entries) => {
    const [entry] = entries; //const entry = entries[0]
    setIsVisible(entry.isIntersecting);
  };
  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, optionsMemo]);
  return isVisibile;
};

export default App;
