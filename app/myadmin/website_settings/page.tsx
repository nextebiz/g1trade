'use client'
import React, { useEffect, useState } from 'react'
import { CheckCircleFilled, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Spin, Switch } from 'antd';
import type { FormInstance } from 'antd/es/form';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export default function AdminSettings() {


    const [setting_id, setSettingId] = useState("")
    const [google_login, setGoogleLogin] = useState(false)
    const [facebook_login, setFacebookLogin] = useState(false)
    const [twitter_login, setTwitterLogin] = useState(false)
    const [pinterest_login, setPinterestLogin] = useState(false)
    const [how_to_sell_video, setHowToSellVideo] = useState("")
    const [how_to_buy_video, setHowToBuyVideo] = useState("")
    const [page_loaded, setPageLoaded] = useState(false)
    const [is_saving, setIsSaving] = useState(false)
    const [is_saved, setIsSaved] = useState(false)


    const onFinish = (values: any) => {

        saveSettings()
    };

    const saveSettings = async () => {
        setIsSaving(true)
        setIsSaved(false)
        const form_data = new FormData();
        form_data.set("setting_id", setting_id.toString())
        form_data.set("google_login", google_login.toString())
        form_data.set("facebook_login", facebook_login.toString())
        form_data.set("twitter_login", twitter_login.toString())
        form_data.set("pinterest_login", pinterest_login.toString())
        form_data.set("how_to_sell_video", how_to_sell_video)
        form_data.set("how_to_buy_video", how_to_buy_video)

        const fetch_settings = await fetch("/api/myadmin/website_settings", { method: "POST", body: form_data })
        const response_settings = await fetch_settings.json();
        console.log(response_settings)
        if (response_settings.status === 200) {
            setIsSaving(false)
            setIsSaved(true)
        } else {
            setIsSaving(false)
            setIsSaved(true)
            alert("Failed to update")
        }
    }

    useEffect(() => {
        const getSettings = async () => {
            const fetch_settings = await fetch("/api/public/website_settings", { method: "POST" })
            const response_settings = await fetch_settings.json();

            if (response_settings.status === 200) {
                setSettingId(response_settings.data.id)
                setGoogleLogin(response_settings.data.google_login)
                setFacebookLogin(response_settings.data.facebook_login)
                setTwitterLogin(response_settings.data.twitter_login)
                setPinterestLogin(response_settings.data.pinterest_login)
                setHowToBuyVideo(response_settings.data.how_to_buy_video)
                setHowToSellVideo(response_settings.data.how_to_sell_video)
            }
            setPageLoaded(true)
        }
        getSettings()
    }, [])
    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

                <div className='text-white ml-10 md:ml-6'>
                    Settings
                </div>
            </div>
            <div className='text-black  p-5 '>
                <section>
                    {page_loaded ?
                        <div>
                            <Form
                                name="control-ref"
                                onFinish={onFinish}
                                style={{ maxWidth: 600 }}
                            >
                                <Form.Item
                                    label="Seller Video"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        value={how_to_sell_video}
                                        onChange={e => {
                                            setHowToSellVideo(e.target.value)
                                        }} />
                                </Form.Item>

                                <Form.Item

                                    label="Buyer Video"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        value={how_to_buy_video}
                                        onChange={e => {
                                            setHowToBuyVideo(e.target.value)
                                        }} />
                                </Form.Item>

                                <Form.Item label="Google Login" rules={[{ required: true }]}>
                                    <Switch
                                        checked={google_login}
                                        onChange={(e) => {
                                            setGoogleLogin(e)
                                        }} />
                                </Form.Item>
                                <Form.Item label="Facebook Login" rules={[{ required: true }]}>
                                    <Switch
                                        checked={facebook_login}
                                        onChange={(e) => {
                                            setFacebookLogin(e)
                                        }} />
                                </Form.Item>
                                <Form.Item label="Twitter Login" rules={[{ required: true }]}>
                                    <Switch
                                        checked={twitter_login}
                                        onChange={(e) => {
                                            setTwitterLogin(e)
                                        }} />
                                </Form.Item>
                                <Form.Item label="Pinterest Login" rules={[{ required: true }]}>
                                    <Switch
                                        checked={pinterest_login}
                                        onChange={(e) => {
                                            setPinterestLogin(e)
                                        }} />
                                </Form.Item>

                                <div className='flex'>
                                    <Button type="primary" htmlType="submit">
                                        Save Settings
                                    </Button>
                                    <div className='ml-4 mt-1 flex '>
                                        {is_saving ?
                                            <div className='flex items-center'>
                                                <Spin />
                                                <span className='ml-2'>Saving data...</span>
                                            </div> : ""}

                                        {is_saved ?
                                            <div className='flex items-center'>
                                                <span className='ml-0 text-lg text-green-600'>
                                                    <CheckCircleFilled />
                                                </span>
                                                <span className='ml-2'>Data Saved</span>
                                            </div>
                                            : ""}
                                    </div>
                                </div>

                            </Form>
                        </div>
                        :
                        <div className='flex items-center'>
                            <span><Spin /></span><span className='ml-2'>Loading...</span>
                        </div>
                    }
                </section>

            </div>

        </div>
    )
}
