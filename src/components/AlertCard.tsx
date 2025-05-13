import {
  Avatar,
  Button,
  Card,
  Flex,
  Space,
  TypographyText,
} from "@/lib/AntRegistry";
import profileImage from "@/assets/images/profile.png";
import { useRouter } from "next/router";
import henceforthApi from "@/utils/henceforthApi";

const AlertCard = (props: any) => {
  console.log(props,"anananann");
  
  const router = useRouter();
  return (
    <Card className="alert_card" bordered={false}>
      <Flex justify="space-between" align="start" className="flex-xxl-nowrap flex-md-wrap flex-sm-nowrap flex-wrap">
        <Flex align="start" justify="center" gap={12} className="mb-3">
        <Button type="text" className="h-100 p-0 me-2" shape="circle">
          <Avatar src={props?.sent_by?.profile_pic ? henceforthApi.FILES.imageSmall(props?.sent_by?.profile_pic) :  profileImage.src} size={50} /></Button>
          <TypographyText className="fw-semibold fs-14 text-capitalize w-100">
            {props.message}
          </TypographyText>
        </Flex>
        {props?.type == "LEAVE" ? (
          <Flex gap={8} align="center" justify="end">
            <Button
              onClick={() =>
                router.replace(`/user/${props?.sent_by?._id ?? props?.sent_by}/view?type=OWN_PROCESS&process_page=1&member_page=1&leave_type=leave&alert_id=${props?._id}&start_date=${props?.leave_start_date}&end_date=${props?.leave_end_date}`)
              }
              className="px-4"
              type="primary"
              size="large"  
            >
              View
            </Button>
            {/* <Button
              onClick={() => props?.handleApprove(props?.sent_by,props?.total_processes,props?._id)
               
              }
              type="default"
              className="px-4"
              size="large"
            >
              Approve
            </Button> */}
          </Flex>
        ) : (
          <Flex gap={8} align="center" justify="end">
            <Button
              onClick={() =>
                router.replace(
                  props?.department_id
                    ? `/department/page/requested/1?limit=12`
                    : `/process/${props?.process_id}/details`
                )
              }
              className="px-4"
              type="primary"
              size="large"
            >
              View
            </Button>
            {/* <Button  onClick={() => props?.handleStatusUpdate(props?.department_id)} type="default" block size="small">Reject</Button> */}
            <Button
              onClick={() => {
                props.setOpenModal(true);
                props?.setRejectedId(props?._id);
              }}
              type="default"
              className="px-4"
              size="large"
            >
              Reject
            </Button>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
export default AlertCard;
