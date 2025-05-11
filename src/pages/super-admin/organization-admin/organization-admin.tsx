/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Image, Modal, Popconfirm, Popover } from 'antd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  AddButton,
  Breadcrumb,
  ContainerBg,
  FileType,
  InputControl,
  Loading,
  Table,
  UploadMoreFile,
} from '@/components';
import { QUERY_KEY } from '@/constants';
import { useGet, usePost } from '@/hooks';
import { imgUrl } from '@/service';
import { errorMasseg, successMasseg } from '@/utils/toastify';

interface IOrganizationAdmin {
  employer_first_name: string | null;
  employer_last_name: string | null;
  employer_position: string | null;
}

export const OrganizationAdmin = () => {
  const { t } = useTranslation();
  const [files, setfiles] = useState<FileType>(null);
  const { data, isLoading } = useGet({
    url: `employers`,
    queryKey: [QUERY_KEY.employers],
  });
  // malumotni uzgartish
  const [editId, seteditId] = useState(null);
  const { mutate, isLoading: loadingData, reloadQueryKey } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm<IOrganizationAdmin>();
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

  const onSubmit = (form: IOrganizationAdmin) => {
    const userData = {
      employer_first_name: form?.employer_first_name,
      employer_last_name: form?.employer_last_name,
      employer_position: form?.employer_position,
      employer_image: files?.file,
    };
    const isEditMode = !!editId;
    mutate({
      url: isEditMode ? `employers/${editId}` : 'employers/create',
      method: isEditMode ? 'PUT' : 'POST',
      data: userData,
      onSuccess: () => {
        reloadQueryKey([QUERY_KEY.employers]);
        handleCancel();
        successMasseg(t("Ma'lumot yangilandi!"));
      },
      onError: (err: any) => {
        errorMasseg(err?.response?.data?.message);
        handleCancel();
      },
    });
  };
  // malumotni uchirish
  const deleteConfirm = (id: number) => {
    mutate({
      url: `employers/${id}`,
      method: 'DELETE',
      onSuccess: (res: any) => {
        handleCancel();
        reloadQueryKey([QUERY_KEY.employers]);
        successMasseg(res?.data?.message || t("Ma'lumot o'chirildi!"));
      },
      onError: (err: any) => {
        errorMasseg(err?.response?.data?.message);
      },
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item: any) => {
    seteditId(item?._id);
    reset({
      employer_first_name: item?.employer_first_name,
      employer_last_name: item?.employer_last_name,
      employer_position: item?.employer_position,
    });
    setfiles({ file: item?.employer_image });
    showModal();
  };
  //inputlani bushatish
  const resInput = () => {
    reset({
      employer_first_name: null,
      employer_last_name: null,
      employer_position: null,
    });
    setfiles(null);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Breadcrumb
        link={t('Jamo')}
        data={<span className="text-primary">- {data?.data?.itemCount}</span>}
      />
      <ContainerBg>
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-medium text-black dark:text-gray-300">{t('Jamo')}</h3>
            <AddButton click={showModal}>
              <PlusOutlined /> {t("Xodim qo'shish")}
            </AddButton>
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
              title: t('Rasm'),
              class: '',
            },
            {
              title: t('Ism'),
              class: '',
            },
            {
              title: t('Familya'),
              class: '',
            },
            {
              title: t('Lavozim'),
              class: '',
            },
            {
              title: t('Amallar'),
              class: '!w-24',
            },
          ]}
        >
          {data?.data?.data?.map((e: any, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {e?.employer_image && (
                  <Image
                    src={imgUrl + e?.employer_image}
                    width={40}
                    className="aspect-[2/3] object-cover object-center"
                  />
                )}
              </td>
              <td>{e?.employer_first_name}</td>
              <td>{e?.employer_last_name}</td>
              <td>{e?.employer_position}</td>
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
                      <Popconfirm
                        title={t("Ma'lumotni o'chirish")}
                        description={t("Haqiqatdan ham o'chirishni hohlaysizmi?")}
                        placement="topRight"
                        onConfirm={() => deleteConfirm(e?._id)}
                        onCancel={() => {}}
                        okText={t('Ha')}
                        cancelText={t("Yo'q")}
                      >
                        <p className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 text-center text-sm text-black duration-300 ease-linear hover:bg-primary-dark-light dark:text-white">
                          <DeleteOutlined />
                          {t("O'chirish")}
                        </p>
                      </Popconfirm>
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
          {/* employer_first_name */}
          <InputControl
            name={'employer_first_name'}
            control={control}
            title={t('Ism')}
            placeholder={t('Ismni kiriting')}
            size={'large'}
          />
          {/* employer_last_name */}
          <InputControl
            name={'employer_last_name'}
            control={control}
            title={t('Familya')}
            placeholder={t('Familyani kiriting')}
            size={'large'}
          />
          {/* employer_position */}
          <InputControl
            name={'employer_position'}
            control={control}
            title={t('Lavozim')}
            placeholder={t('Lavozimni kiriting')}
            required={true}
            size={'large'}
          />
          <UploadMoreFile text={t('Rasmni yuklang')} setfiles={setfiles} files={files} />
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
