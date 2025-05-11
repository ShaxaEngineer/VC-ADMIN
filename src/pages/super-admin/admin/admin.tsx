/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { CheckOutlined, CloseOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Modal, Popover } from 'antd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddButton, Breadcrumb, ContainerBg, InputControl, Loading, Table } from '@/components';
import { QUERY_KEY } from '@/constants';
import { useGet, usePost } from '@/hooks';
import { errorMasseg, successMasseg } from '@/utils/toastify';

interface IAdmin {
  username: string | null;
  password: string | null;
}

export const Admin = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGet({
    url: `admin/all`,
    queryKey: [QUERY_KEY.admin],
  });
  // malumotni uzgartish
  const [editId, seteditId] = useState(null);
  const { mutate, isLoading: loadingData, reloadQueryKey } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm<IAdmin>();
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
    resInput();
    seteditId(null);
  };

  const onSubmit = (form: IAdmin) => {
    const userData = {
      username: form?.username,
      password: form?.password,
    };
    mutate({
      url: `admin/${editId}`,
      method: 'PUT',
      data: userData,
      onSuccess: () => {
        reloadQueryKey([QUERY_KEY.admin]);
        handleCancel();
        successMasseg(t("Ma'lumot yangilandi!"));
      },
      onError: (err: any) => {
        errorMasseg(err?.response?.data?.message);
        handleCancel();
      },
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item: any) => {
    seteditId(item?.id);
    reset({
      username: item?.username,
    });

    showModal();
  };
  //inputlani bushatish
  const resInput = () => {
    reset({
      username: null,
      password: null,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Breadcrumb
        link={t('Boshqaruvchi')}
        data={<span className="text-primary">- {data?.data?.itemCount}</span>}
      />
      <ContainerBg>
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-medium text-black dark:text-gray-300">
              {t('Boshqaruvchi')}
            </h3>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-300/40 dark:bg-gray-600/40"></div>
      </ContainerBg>
      <ContainerBg className="mt-6">
        <Table
          loading={isLoading}
          columns={[
            {
              title: t('T/r'),
              class: '!w-6',
            },
            {
              title: t('Foydalanuvchi nomi'),
              class: '',
            },
            {
              title: t('Amallar'),
              class: '!w-24',
            },
          ]}
        >
          {data?.data?.map((e: any, i: number) => (
            <tr key={e?.id}>
              <td>{i + 1}</td>
              <td>{e?.username}</td>
              <td>
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="flex flex-col items-start justify-start p-3">
                      <p
                        onClick={() => updateOrganizations(e)}
                        className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 text-center text-sm text-black duration-300 ease-linear hover:bg-primary-dark-light dark:text-white"
                      >
                        <EditOutlined />
                        {t('Tahrirlash')}
                      </p>
                    </div>
                  }
                  trigger="click"
                >
                  <div className="text-pribg-primary flex w-max items-center justify-center rounded-lg bg-primary-dark-light p-1 text-xl duration-300 ease-linear hover:bg-primary hover:text-white">
                    <MoreOutlined />
                  </div>
                </Popover>
              </td>
            </tr>
          ))}
        </Table>
      </ContainerBg>
      <Modal
        title={t("Tizimga boshqaruvchi qo'shish")}
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        zIndex={1050}
        maskClosable={false}
        footer={''}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col items-center gap-3">
          {/* username */}
          <InputControl
            name={'username'}
            control={control}
            title={t('Foydalanuvchi nomi')}
            placeholder={t('Foydalanuvchi nomini kiriting')}
            size={'large'}
          />
          {/* password */}
          <InputControl
            name={'password'}
            control={control}
            title={t('Foydalanuvchi paroli')}
            placeholder={t('Foydalanuvchi parolini kiriting')}
            size={'large'}
          />
          <div className="flex w-full items-center justify-end gap-4">
            <AddButton click={handleCancel} color="#e7515a">
              <CloseOutlined />
              {t('Bekor qilish')}
            </AddButton>
            <AddButton disabled={loadingData} type="submit" color="#2196f3">
              <CheckOutlined />
              {t('Saqlash')}
            </AddButton>
          </div>
        </form>
      </Modal>
    </>
  );
};
