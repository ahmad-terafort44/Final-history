import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'
import style from "./DevServer.module.scss"
import 'ag-grid-community/styles/ag-theme-quartz.css'
import axios from "axios";
import { useEffect } from "react";
import React, { useState } from 'react';
import FullScreenImage from '../FullScreenImage'

const Image = ({url,setOpenModel,setImage})=>{
    return(
        typeof url!=="number" && url!==null ? url.map((v)=>{
            return(
                <button style={{width:"50%",background:"transparent",border:"none"}} onClick={()=>{setOpenModel(true)
                    setImage(v)
                }}>
                <img src={v} alt="Not Found" style={{width:"100%",height:"100%",objectFit:"contain"}} width={0} height={0} sizes="100%"/>
                </button>
            )
        })
    :url)
}
export default function TableSwap() {
    const [rowData, setRowData] = useState([]);
    const [page, setPage] = useState(1)
    const [badResponse,setBadResponse] = useState(false)
    const [image,setImage]= useState([])
    const [openModel,setOpenModel] = useState(false)
    function getData() {
        axios.get("https://sapi.aspire.pics/api/history/")
            .then((response) => {
                setRowData(response.data.data.items)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    function next() {
        setPage(parseInt(page) + 1)
    }
    function prev() {
        if(page==1) return 0;
        setPage(parseInt(page) - 1)
    }

    const array = rowData.map((item, index) => {
            return (
                {
                    id: item.id.toString(),
                    user: item.user == null ? "null" : item.user.toString(),
                    anonymous_id: item.anonymous_id == null ? "null" : item.anonymous_id.toString(),
                    prompt: item.prompt.toString(),
                    aws_show_image: item.aws_show_image ? item.aws_show_image.map((v) => v.toString()) : "",
                    celebrity_check: item.celebrity_check.toString(),
                    moderation_label: item.moderation_level !== "" ? item.moderation_level.map((v) => v.moderation_label.toString()) : "null",
                    moderation_confidence: item.moderation_level !== "" ? item.moderation_level.map((v) => v.moderation_confidence.toString()) : "null",
                    final_score: item.final_score.toString(),
                    racy: item.google_score !== "" && typeof item.google_score !== "string" ? item.google_score.map((v) => v.racy.toString()) : item.google_score.toString(),
                    adult: item.google_score !== "" && typeof item.google_score !== "string" ? item.google_score.map((v) => v.adult.toString()) : item.google_score.toString(),
                    medical: item.google_score !== "" && typeof item.google_score !== "string" ? item.google_score.map((v) => v.medical.toString()) : item.google_score.toString(),
                    spoofed: item.google_score !== "" && typeof item.google_score !== "string" ? item.google_score.map((v) => v.spoofed.toString()) : item.google_score.toString(),
                    violence: item.google_score !== "" && typeof item.google_score !== "string" ? item.google_score.map((v) => v.violence.toString()) : item.google_score.toString(),
                    chatgpt_score: typeof item.chatgpt_score=="object"?"null":item.chatgpt_score.toString(),
                    seed: item.seed.toString(),
                    sum_of_all_time: item.times !== null ? item.times.sum_of_all_time.toString().slice(0,4) : "null",
                    unsafe_total_time: item.times !== null ? item.times.unsafe_total_time.toString().slice(0,4) : "null",
                    google_vision_time: item.times !== null ? item.times.google_vision_time.toString().slice(0,4) : "null",
                    ["time for image creation"]: item.times !== null ? item.times["time for image creation"].toString().slice(0,4) : "null",
                    url_list: item.url_list!==null && typeof item.url_list!=="number" ? item.url_list.map((url)=>url):item.url_list,
                }
            )
        })
        
    useEffect(() => {
        if(page==1){
            document.getElementById("prevBtn").style.opacity ="10%"
        }else{
            document.getElementById("prevBtn").style.opacity ="100%"
        }
        axios.get(`https://sapi.aspire.pics/api/history/?page=${page}`)
            .then((response) => {
                setRowData(response.data.data.items)
                setBadResponse(false)
            })
            .catch(error => {console.log(error)
                setBadResponse(true)
            })
    }, [page])

    const [colDefs, setColDefs] = useState([
        { field: 'id', headerName: "ID", flex: 1, },
        { field: 'user', headerName: "User", flex: 1 },
        { field: 'anonymous_id', headerName: 'Anonymous ID', flex: 1 },
        { field: 'prompt', headerName: "Prompt", flex: 1 },
        { field: 'aws_show_image', headerName: "AWS Show Image", flex: 1 },
        { field: 'celebrity_check', headerName: "Celebrity Check", flex: 1 },
        {
            headerName: "Moderation Level", flex: 1, children: [
                { field: "moderation_label", flex: 1, headerName: "Moderation Label" },
                { field: "moderation_confidence", flex: 1, headerName: "Moderation Confidence" }
            ]
        },
        { field: 'final_score', headerName: "Final Score", flex: 1 },
        {
            headerName: "Google Show Image", flex: 1, children: [
                { field: "racy", flex: 1 },
                { field: "adult", flex: 1 },
                { field: "medical", flex: 1 },
                { field: "spoofed", flex: 1 }
                , { field: "violence", flex: 1 }
            ]
        },
        { field: 'chatgpt_score', headerName: "ChatGPT Score", flex: 1 },
        { field: 'seed', headerName: "Seed", flex: 1 },
        {
            headerName: "Time", flex: 1, children: [
                { field: "sum_of_all_time", headerName: "Sum of All Time", flex: 1 },
                { field: "unsafe_total_time", headerName: "Unsafe Total Time", flex: 1 },
                { field: "google_vision_time", headerName: "Google Vision Time", flex: 1 },
                { field: "time for image creation", headerName: "Time for Image Creation", flex: 1 },
            ]
        },
        { field: 'url_list', headerName: "URL List", flex: 1,cellRenderer: (props)=>{
            return <Image setImage={setImage} url={props.node.data.url_list} setOpenModel={setOpenModel}/>
        }},
    ]);


    return (
        <div className={"ag-theme-quartz"} style={{ width: "100%", height: "calc(100vh - 150px)" }}>
            <h1 style={{textAlign:"center"}}>Aspire Image Creation History</h1>
            {openModel?
            <FullScreenImage setOpenModel={setOpenModel} image={image}/>
        :""}
            {badResponse?
            <div className={style.notFound}>
                    <p>Not Found</p>
            </div>:
            <AgGridReact rowData={array} columnDefs={colDefs}/>
        }
            <div className={style.pagination}>
                <button id="prevBtn" onClick={() => { prev() }}>Prev</button>
                <input min={1} type="number" value={page} onChange={(e) => { setPage(e.target.value) }} />
                <button onClick={() => { next() }}>Next</button>
            </div>
        </div>
    );
};