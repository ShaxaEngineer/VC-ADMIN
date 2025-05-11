import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Loading } from '@/components';
import { useAppSelector } from '@/hooks';
import { BlankLayout, MainLayout } from '@/layouts';
import { authConfigSelector } from '@/store';

import { Private } from './private';
import { routesData } from './routes-data';

export const Router: React.FC = () => {
  const { role } = useAppSelector(authConfigSelector);

  return (
    <>
      <Routes>
        {routesData?.map((item) => {
          if (item.role) {
            if (item?.role?.some((element) => role?.includes(element))) {
              // agarda ichida children bulsa shu block ishlidi
              if (item.children) {
                return item.children?.map((children) => {
                  return (
                    <Route
                      key={children.id}
                      path={children.path}
                      element={
                        <Private>
                          {children.layout === 'blank' ? (
                            <BlankLayout>
                              <Suspense fallback={<Loading />}>{children.element}</Suspense>
                            </BlankLayout>
                          ) : (
                            <MainLayout>
                              <Suspense fallback={<Loading />}>{children.element}</Suspense>
                            </MainLayout>
                          )}
                        </Private>
                      }
                    />
                  );
                });
              } else
                return (
                  <Route
                    key={item.id}
                    path={item.path}
                    element={
                      <Private>
                        {item.layout === 'blank' ? (
                          <BlankLayout>
                            <Suspense fallback={<Loading />}>{item.element}</Suspense>
                          </BlankLayout>
                        ) : (
                          <MainLayout>
                            <Suspense fallback={<Loading />}>{item.element}</Suspense>
                          </MainLayout>
                        )}
                      </Private>
                    }
                  />
                );
            }
          } else {
            // bunga role yuq kodla ishlidi
            return (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <>
                    {item.see ? (
                      item.layout === 'blank' ? (
                        <BlankLayout>
                          <Suspense fallback={<Loading />}>{item.element}</Suspense>
                        </BlankLayout>
                      ) : (
                        <MainLayout>
                          <Suspense fallback={<Loading />}>{item.element}</Suspense>
                        </MainLayout>
                      )
                    ) : (
                      <Private>
                        {item.layout === 'blank' ? (
                          <BlankLayout>
                            <Suspense fallback={<Loading />}>{item.element}</Suspense>
                          </BlankLayout>
                        ) : (
                          <MainLayout>
                            <Suspense fallback={<Loading />}>{item.element}</Suspense>
                          </MainLayout>
                        )}
                      </Private>
                    )}
                  </>
                }
              />
            );
          }
        })}
      </Routes>
    </>
  );
};
