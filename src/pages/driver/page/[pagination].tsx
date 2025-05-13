import HenceforthIcons from "@/components/HenceforthIcons"
import MainLayout from "@/components/common/MainLayout"
import { Avatar, Button, Checkbox, Col, Dropdown, Spin, Flex, Input, Pagination, Row, Select, Table, Tabs, TypographyText, TypographyTitle } from "@/lib/AntRegistry"
import { Form, MenuProps, TabsProps, Tooltip } from "antd"
import React, { ReactElement, useEffect, useState } from "react"
import profile from '@/assets/images/profile.png';
import { EyeOutlined } from '@ant-design/icons';
import Link from "next/link"
import { useRouter } from "next/router"
import { GlobalContext } from "@/context/Provider"
import henceforthApi from "@/utils/henceforthApi"
import { getRoleForUrl } from "@/utils/henceforthValidations"
import dayjs from "dayjs"
const TeammatePage = () => {
    const router = useRouter()
    const [dateForm] = Form.useForm()
    const query = router.query;
    const { Toast } = React.useContext(GlobalContext)
    const [state, setState] = React.useState({
        data: [],
        count: 0
    });
    const [loading, setLoading] = React.useState(false)
    const [dateModal, setDateModal] = useState(false)
    const itemsFilter: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Button
                onClick={() => {
                    router.push({
                      query: { ...router.query, new_filter: "dates" },
                    });setDateModal(true)
                  }}
                    type="text"
                >
                    Dates
                </Button>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "2",
            label: (
                <Button
                    onClick={() => {
                        router.push({
                            query: { ...router.query, new_filter: "last_update" },
                        });
                    }}
                    type="text"
                >
                    Last Update
                </Button>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "3",
            label: (
                <Button
                    onClick={() => {
                        router.push({
                            query: { ...router.query, new_filter: "created_by" },
                        });
                    }}
                    type="text"
                >
                    Created By
                </Button>
            ),
        },
    ];
    // const items2: MenuProps['items'] = [
    //     {
    //         key: 'team_admin',
    //         label: <Button onClick={() => handleRoute('team_admin')} type="text" className="text-dark p-0 h-100 text-start bg-transparent">Team Admin</Button>,
    //     },
    //     {
    //         type: 'divider',
    //     },
    //     {
    //         key: 'members',
    //         label: <Button type="text" onClick={() => handleRoute('members')} className="text-dark p-0 h-100 text-start bg-transparent">Member</Button>,
    //     },
    // ];
    const items2: MenuProps["items"] = [
        {
          key: "1",
          label: (
            <Button onClick={() => handleRoute("all")} type="text" className="text-dark p-0 h-100 text-start">
              All
            </Button>
          ),
        },
        {
          type: "divider",
        },
        // {
        //   key: "2",
        //   label: (
        //     <Button onClick={() => handleRoute("company_admin")} type="text" className="text-dark p-0 h-100 text-start">
        //       Company Admin
        //     </Button>
        //   ),
        // },
        // {
        //   type: "divider",
        // },
        // {
        //   key: "3",
        //   label: (
        //     <Button onClick={() => handleRoute("team_admin")} type="text" className="text-dark p-0 h-100 text-start">
        //       Team Admin
        //     </Button>
        //   ),
        // },
        // {
        //   type: "divider",
        // },
        // {
        //   key: "4",
        //   label: (
        //     <Button onClick={() => handleRoute("member")} type="text" className="text-dark p-0 h-100 text-start">
        //       Member
        //     </Button>
        //   ),
        // },
      ];
    // const action = (res: any) => [
    //     {
    //         key: '1',
    //         label: <Link href={`/user/${res._id}/view?type=OWN_PROCESS`} className="fw-semibold">View</Link>,
    //     },
    //     {
    //         type: 'divider',
    //     },
    //     {
    //         key: '2',
    //         label: <Link href={`/user/${res._id}/view`} className="fw-semibold">Deactivate</Link>,
    //     },
    //     {
    //         type: 'divider',
    //     },
    //     {
    //         key: '2',
    //         label: <Link href={`/user/${res._id}/view`} className="fw-semibold">Delete</Link>,
    //     },
    // ];

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            render: (text: any, res: any, i: any) => { return (router.query.pagination ? (Number(router.query.pagination) - 1) * Number(router.query.limit || 10) + (i + 1) : i + 1) }
        },
        // {
        //     title: <Checkbox />,
        //     dataIndex: 'checkbox',
        //     key: 'checkbox',
        //     render: (text: any, res: any, index: any) => { return <Checkbox /> }
        // },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text: any, res: any, index: any) => { return <Flex align="center" gap={8}><Avatar src={res?.profile_pic ? henceforthApi.FILES.imageMedium(res?.profile_pic, "") : profile.src} size={40} /><TypographyText>{res?.first_name ?? "N/A"}</TypographyText></Flex> }
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (text: any, res: any, index: any) => { return (res?.last_name ?? "N/A") }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: any, res: any, index: any) => { return <Flex gap={3} className="tooltip-copy" style={{minWidth:180}}><Tooltip title={res.email}>{ res.email?.length > 20 ? `${res.email?.slice(0,20)}...` : res?.email}</Tooltip><span role="button" className="copy-icon" onClick={() => {navigator.clipboard.writeText(res.email);Toast.success('Copied successfully')}}><HenceforthIcons.CopyFill/></span></Flex> }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, res: any, index: any) =>
                <Link href={`/driver/${res._id}/view`} className="fw-semibold"><Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><EyeOutlined /></Button></Link>

        },
    ];
    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: 'All',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data} columns={columns} />
            </div>,
        },
        // {
        //     key: 'company_admin',
        //     label: 'Company Admins',
        //     children: <div className="tab_content">
        //         <Flex gap={8} className="mb-4">
        //             <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
        //             <Dropdown
        //                 menu={{ items: itemsFilter }}
        //                 placement="bottomLeft"
        //                 arrow
        //             >
        //                 <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
        //             </Dropdown>
        //         </Flex>
        //         <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data} columns={columns} />
        //     </div>,
        // },
        // {
        //     key: 'team_admin',
        //     label: 'Team Admins',
        //     children: <div className="tab_content">
        //         <Flex gap={8} className="mb-4">
        //             <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
        //             <Dropdown
        //                 menu={{ items: itemsFilter }}
        //                 placement="bottomLeft"
        //                 arrow
        //             >
        //                 <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
        //             </Dropdown>
        //         </Flex>
        //         <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data} columns={columns} />
        //     </div>,
        // },
        // {
        //     key: 'members',
        //     label: 'Members',
        //     children: <div className="tab_content">
        //         <Flex gap={8} className="mb-4">
        //             <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
        //             <Dropdown
        //                 menu={{ items: itemsFilter }}
        //                 placement="bottomLeft"
        //                 arrow
        //             >
        //                 <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
        //             </Dropdown>
        //         </Flex>
        //         <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data} columns={columns} />
        //     </div>,
        // },
    ];


    const initData = async () => {
        try {
            setLoading(true)
            let urlSearchParam = new URLSearchParams();

            if (query.pagination) {
                urlSearchParam.set("pagination", String(Number(query.pagination) - 1));
            }
            if (query.new_filter) {
                urlSearchParam.set("new_filter", String(query.new_filter));
            }
            if (query.search) {
                urlSearchParam.set("search", String(query.search));
            }
            if(query.new_filter == "dates"){
                if (query.start_date) {
                  urlSearchParam.set("start_date", String(query.start_date));
                }
                if (query.end_date) {
                  urlSearchParam.set("end_date", String(query.end_date));
                }
              }
            urlSearchParam.set("limit", String(10));
            urlSearchParam.set("filter", String(query.type).toUpperCase());
            let apiRes = await henceforthApi.Drivers.list(urlSearchParam.toString());
            setState(apiRes);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };
    console.log(state, "stataatt");


    const removeQueryParam = (param: string) => {
        const { pathname, query } = router;
        const params = new URLSearchParams(query as any);
        params.delete(param);
        router.replace(
            { pathname, query: params.toString() },
            undefined,
            { shallow: true }
        );
    };
    console.log(state, "statetetet");
    const handleRoute = (value: any) => {
        const oldQuery = router.query
        router.replace({
            query: { ...oldQuery,pagination: 1, type: value }
        }, undefined, { shallow: true })
    }
    // const handleRoute = (value: any) => {
    //     const oldQuery = router.query;
    //     if(!value){
    //       removeQueryParam("role")
    //     }else{
    //       router.replace(
    //         {
    //           query: { ...oldQuery,pagination: 1, type: value },
    //         },
    //         undefined,
    //         { shallow: true }
    //       );
    //     }
        
    //   };
    const handleDateSubmit = async (values:any) => {
        console.log(values,"valuessjsjsjs");
        
        setLoading(true);
        try {
          // const apiRes = await henceforthApi.Process.archieved( {});
          // await initData()
          // router.replace(`/process/list/all/1`);
          router.replace({
            query:{...router.query,new_filter:"dates",start_date:dayjs(values?.leaveDates[0]).valueOf(),end_date:dayjs(values?.leaveDates[1]).valueOf()}
          })
          dateForm.resetFields()
          setDateModal(false)
        } catch (error) {
          setLoading(false);
        } finally {
        }
      };
    const onSearch = (value: any) => {
        if (value == '') return removeQueryParam('search')
        const oldQuery = router.query
        router.replace({
            query: { ...oldQuery, search: value }
        }, undefined, { shallow: true })
    }
    const handlePagination = (page: number, pageSize: number) => {
        setLoading(true)
        setState({data:[] , count:0})
        router.replace({
            query: { ...router.query, pagination: page, limit: pageSize }
        }, undefined, { shallow: true })
    }
    useEffect(() => {
        removeQueryParam('search')
    }, [])
    React.useEffect(() => {
        initData();
        if(router.query.new_filter !== "dates"){
            delete router.query.start_date
            delete router.query.end_date
          }

    }, [query.type, query.pagination, query.search, query.new_filter,query.start_date, query.end_date]);

    return (
        <React.Fragment>
            <section className="teammates">
                <div className="container-fluid">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex justify="space-between" align="center" gap={10}>
                                <TypographyTitle level={4} className="m-0">Drivers</TypographyTitle>
                                {/* <Link href={`/user/add`}><Button type="primary" size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Plus />}>Add New Teammate</Button></Link> */}
                            </Flex>
                        </Col>
                        {/* tabs */}
                        <Col span={24}>
                            <Spin spinning={loading}>
                                <Tabs onChange={handleRoute} defaultActiveKey={String(router.query.type)} items={items} />
                            </Spin>
                        </Col>
                    </Row>
                    <Row justify={'center'} className="mt-4 mb-4">
                        <Col span={24} className="text-center">
                            <Pagination current={Number(router.query.pagination) || 0} pageSize={Number(router.query.limit) || 10} total={state?.count} hideOnSinglePage={true} disabled={loading} onChange={handlePagination} />
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
TeammatePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default TeammatePage