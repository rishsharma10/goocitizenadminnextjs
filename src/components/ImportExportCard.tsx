import { Avatar, Button, Card, Flex, Image, Space, TypographyText, TypographyTitle } from "@/lib/AntRegistry"
import React from "react"
import placeholder from '@/assets/images/profile.png';
import HenceforthIcons from "./HenceforthIcons";
import dayjs from 'dayjs';
import henceforthApi, { BUCKET_ROOT } from "@/utils/henceforthApi";
import { useRouter } from "next/router";
const ImportExportCard = (props: any) => {
    const router = useRouter()
    console.log(props, "prropssss");

    const handleShare = () => {
        if (props?.media_type == "IMAGE") {
            router.push(`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.media_url}`)
        } else if (props?.media_type == "VIDEO") {
            router.push(`${BUCKET_ROOT}/video/${props?.media_url}`)
        } else if (props?.media_type == "DOC") {
            router.push(`${henceforthApi.API_FILE_ROOT_DOCUMENTS}${props?.media_url}`)
        } else if (props?.media_type == "AUDIO") {
            router.push(`${BUCKET_ROOT}/audio/${props?.media_url}`)
        }
    }
    return (
        <React.Fragment>
            <Card className="bg-transparent shadow-none" bordered={false}>
                <Flex align="center" gap={16}>
                    {props?.media_type === "IMAGE" ? (<Image src={henceforthApi.FILES.imageOriginal(props?.media_url, placeholder.src)} height={100} width={100} style={{ minWidth: 100, borderRadius: 8 }} />)
                        :
                        (props?.media_type === "VIDEO" ? (<div className="import_video position-relative" onClick={handleShare}>
                            <video poster={henceforthApi.FILES.video(props?.media_url)} className="img-fluid rounded-3">
                                <source src="" />
                            </video>
                            <span className="position-absolute"><HenceforthIcons.PlaySm /></span>
                        </div>) :
                            (<div className="import_video position-relative" onClick={handleShare}>
                                <video poster={henceforthApi.FILES.video(props?.media_url)} className="img-fluid rounded-3" >
                                    <source src="" />
                                </video>
                                <span className="position-absolute"><HenceforthIcons.AudioRocord /></span>
                            </div>)
                        )}
                    <Space direction="vertical" className="gap-1" >
                        <TypographyTitle level={5} className="m-0">{props?.media_url}</TypographyTitle>
                        <TypographyText type="secondary" className="d-block mb-1">{dayjs(props?.created_at).format('D MMMM, YYYY [at] hh:mm A')}</TypographyText>
                        <TypographyText type="secondary" className="d-block mb-1">{props?.user_id?.first_name ? `${props?.user_id?.first_name} ${props?.user_id?.last_name ?? ""}` : props?.user_id?.email ? props?.user_id?.email : "N/A"}</TypographyText>
                        <Button type="text" className="text-primary p-0 h-100" icon={<HenceforthIcons.Download />} onClick={() => {
                            fetch(henceforthApi.FILES.video(props?.media_url), {
                                mode: 'cors', // Ensure CORS is handled if needed
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    return response.blob();
                                })
                                .then(blob => {
                                    const link = document.createElement('a');
                                    const url = URL.createObjectURL(blob);
                                    link.href = url;
                                    link.setAttribute('download', 'video.mp4'); // You can customize the filename
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    URL.revokeObjectURL(url); // Clean up the URL object
                                })
                                .catch(error => console.error('There has been a problem with your fetch operation:', error));
                        }}
                        >Download</Button>
                    </Space>
                </Flex>
            </Card>
        </React.Fragment>
    )
}
export default ImportExportCard