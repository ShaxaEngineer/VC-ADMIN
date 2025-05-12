/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import {
  CloudUploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { FILE } from '@/assets';
import { token } from '@/constants';
import { baseUrl, imgUrl } from '@/service';
import { getLocalStorage, idCreate } from '@/utils';

export type FileType = {
  file: string;
} | null;

interface UploadMoreFileProps {
  files: FileType;
  setfiles: React.Dispatch<React.SetStateAction<FileType>>;
  type?: string;
  text?: string;
}

export const UploadMoreFile: React.FC<UploadMoreFileProps> = ({
  files,
  setfiles,
  type,
  text = '',
}) => {
  // const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  // const { mutate, isLoading: loadingDelete } = usePost();
  const id = idCreate();

  const filesUploading = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (!file.target.files) return;

    setisLoading(true);
    const data = new FormData();
    data.append('file', file.target.files[0]);
    fetch(`${baseUrl}/files/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getLocalStorage(token)}`,
      },
      redirect: 'follow',
      body: data,
    })
      .then((res) => res.json())
      .then((resJson) => {
        setisLoading(false);
        const newFile: FileType = {
          file: `/${resJson?.file}`,
        };
        setfiles(newFile);
      })
      .catch(() => {
        setisLoading(false);
      });
    file.target.value = '';
  };

  const fileDelete = (id: number | string) => {
    console.log(id);
    setfiles(null);
    // mutate({
    //   url: `files/${id}`,
    //   method: 'DELETE',
    //   onSuccess: (res: any) => {
    //     successMasseg(res?.data?.message || t("Fayl o'chirildi"));
    //   },
    //   onError: (err: any) => {
    //     errorMasseg(err?.response?.data?.detail);
    //   },
    // });
  };

  const showFdf = (url: string) => {
    window.open(imgUrl + url);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <input
          className="hidden"
          onChange={filesUploading}
          type="file"
          accept={type || ''}
          id={id}
          disabled={isLoading}
        />
        <div className="mt-2 flex w-full flex-wrap items-start justify-start gap-2">
          <label
            htmlFor={id}
            className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#e0e6ed] p-2 text-center text-3xl text-primary transition-all duration-300 hover:border-primary dark:border-[#1b2e4b]"
          >
            {isLoading ? (
              <LoadingOutlined />
            ) : (
              <>
                <CloudUploadOutlined />
                <p className="text-sm font-semibold">{text}</p>
              </>
            )}
          </label>
          {files?.file && (
            <div
              style={{ backgroundImage: `url(${FILE})` }}
              className="overflow-hidden rounded-md bg-cover bg-center"
            >
              <div
                style={{ backgroundImage: `url(${imgUrl + files?.file})` }}
                className="text flex h-28 w-28 items-center justify-center gap-2 border border-[#e0e6ed] bg-cover bg-center px-2 py-1 text-black dark:border-[#1b2e4b] dark:text-white"
              >
                <span
                  onClick={() => fileDelete(files?.file)}
                  className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white opacity-60 hover:opacity-100"
                >
                  <DeleteOutlined />
                  {/* {loadingDelete ? <LoadingOutlined /> : <DeleteOutlined />} */}
                </span>
                <span
                  onClick={() => showFdf(files?.file)}
                  className="rounded bg-gray-500 px-2 py-1 text-white opacity-60 hover:text-white hover:opacity-100"
                >
                  <EyeOutlined />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
