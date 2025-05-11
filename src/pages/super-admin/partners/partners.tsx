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
import { useLocation } from 'react-router-dom';

import {
  AddButton,
  Breadcrumb,
  ContainerBg,
  FileType,
  InputControl,
  Paginations,
  Table,
  UploadMoreFile,
} from '@/components';
import { QUERY_KEY } from '@/constants';
import { useGet, usePost } from '@/hooks';
import { imgUrl } from '@/service';
import { buildUrl } from '@/utils';
import { errorMasseg, successMasseg } from '@/utils/toastify';

interface IPartners {
  partner_name: string | null;
  partner_information: string | null;
}

export const Partners = () => {
  const { t } = useTranslation();
  const [files, setfiles] = useState<FileType>(null);

  // pagination
  const location = useLocation();
  const query: any = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;
  const pageSize = parseInt(query.get('size')) || 10;

  const { data, isLoading } = useGet({
    url: buildUrl('partners', {
      page: currentPage,
      limit: pageSize,
    }),
    queryKey: [QUERY_KEY.partners, currentPage, pageSize],
  });
  // malumotni uzgartish
  const [editId, seteditId] = useState(null);
  const { mutate, isLoading: loadingData, reloadQueryKey } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm<IPartners>();
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

  const onSubmit = (form: IPartners) => {
    const userData = {
      partner_name: form?.partner_name,
      partner_information: form?.partner_information,
      partner_image: files?.file,
    };
    const isEditMode = null;
    mutate({
      url: isEditMode ? `partners/${editId}` : 'partners',
      method: isEditMode ? 'PUT' : 'POST',
      data: userData,
      onSuccess: () => {
        reloadQueryKey([QUERY_KEY.partners]);
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
      url: `partners/${id}`,
      method: 'DELETE',
      onSuccess: (res: any) => {
        handleCancel();
        reloadQueryKey([QUERY_KEY.partners]);
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
      partner_name: item?.partner_name,
      partner_information: item?.partner_information,
    });
    setfiles({ file: item?.partner_image });
    showModal();
  };
  //inputlani bushatish
  const resInput = () => {
    reset({
      partner_name: null,
      partner_information: null,
    });
    setfiles(null);
  };

  return (
    <>
      <Breadcrumb
        link={t('Hamkorlar')}
        data={<span className="text-primary">- {data?.data?.itemCount}</span>}
      />
      <ContainerBg>
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-medium text-black dark:text-gray-300">{t('Hamkorlar')}</h3>
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
              title: t('Ish rasmi'),
              class: '',
            },
            {
              title: t('Ish nomi'),
              class: '',
            },
            {
              title: t('Ish kategoriyasi'),
              class: '',
            },
            {
              title: t('Amallar'),
              class: '!w-24',
            },
          ]}
        >
          {data?.data?.map((e: any, i: number) => (
            <tr key={i}>
              <td>{(currentPage - 1) * pageSize + i + 1}</td>
              <td>
                {e?.partner_image && (
                  <Image
                    src={imgUrl + e?.partner_image}
                    width={40}
                    className="aspect-[2/3] object-cover object-center"
                  />
                )}
              </td>
              <td>{e?.partner_name}</td>
              <td>{e?.partner_information}</td>
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
        <Paginations data={data?.meta} currentPage={currentPage} pageSize={pageSize} />
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
          {/* partner_name */}
          <InputControl
            name={'partner_name'}
            control={control}
            title={t('Hamkor nomi')}
            placeholder={t('Hamkor nomini kiriting')}
            size={'large'}
            required={true}
          />
          {/* partner_information */}
          <InputControl
            name={'partner_information'}
            control={control}
            title={t('Hamkor haqida')}
            placeholder={t('Hamkor haqidani kiriting')}
            size={'large'}
            required={true}
          />
          <UploadMoreFile text={t('Logoni yuklang')} setfiles={setfiles} files={files} />
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
