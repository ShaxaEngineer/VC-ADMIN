/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, FileTextOutlined, MoreOutlined } from '@ant-design/icons';
import { Popconfirm, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { BooleanGetName, Breadcrumb, ContainerBg, Loading, Paginations, Table } from '@/components';
import { QUERY_KEY } from '@/constants';
import { useGet, usePost } from '@/hooks';
import { buildUrl } from '@/utils';
import { errorMasseg, successMasseg } from '@/utils/toastify';

export const Candinates = () => {
  const { t } = useTranslation();

  // pagination
  const location = useLocation();
  const query: any = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;
  const pageSize = parseInt(query.get('size')) || 10;

  const { data, isLoading } = useGet({
    url: buildUrl('candinates', {
      page: currentPage,
      limit: pageSize,
    }),
    queryKey: [QUERY_KEY.candinates, currentPage, pageSize],
  });
  // malumotni uzgartish
  const { mutate, reloadQueryKey } = usePost();

  // malumotni uchirish
  const deleteConfirm = (id: number) => {
    mutate({
      url: `candinates/${id}`,
      method: 'DELETE',
      onSuccess: (res: any) => {
        reloadQueryKey([QUERY_KEY.candinates]);
        successMasseg(res?.data?.message || t("Ma'lumot o'chirildi!"));
      },
      onError: (err: any) => {
        errorMasseg(err?.response?.data?.message);
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Breadcrumb
        link={t('Nomzodlar')}
        data={<span className="text-primary">- {data?.data?.itemCount}</span>}
      />
      <ContainerBg>
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-medium text-black dark:text-gray-300">{t('Nomzodlar')}</h3>
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
              title: t('Yuklangan resume'),
              class: '',
            },
            {
              title: t('Ism va familiya'),
              class: '',
            },
            {
              title: t('Elektron pochta'),
              class: '',
            },
            {
              title: t('Telefon raqam'),
              class: '',
            },
            {
              title: t('Buyuk Britaniyada ishlash huquqi bormi ?'),
              class: '',
            },
            {
              title: t('Lavozim'),
              class: '',
            },
            {
              title: t('Xabarlar'),
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
                {e?.candinate_resume && (
                  <a
                    href={e?.candinate_resume}
                    target="_blank"
                    className="rounded-md border border-gray-500/50 px-2 py-1 text-xl"
                  >
                    <FileTextOutlined />
                  </a>
                )}
              </td>
              <td>{e?.candinate_name}</td>
              <td>{e?.candinate_email}</td>
              <td>{e?.candinate_number}</td>
              <td>
                <BooleanGetName
                  bool={e?.candinate_eligibl_uk}
                  active={t('Bor')}
                  passive={t('Yuq')}
                />
              </td>
              <td>{e?.candinate_position}</td>
              <td>{e?.candinate_message}</td>
              <td>
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="flex flex-col items-start justify-start p-3">
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
    </>
  );
};
