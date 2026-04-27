'use client'

import React, { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '~/utils/cn'
import { kunMoyuMoe } from '~/config/moyu-moe'
import {
  Gamepad2,
  FileText,
  Tags,
  Building,
  MessagesSquare,
  Home,
  Hash,
  X,
  HeartIcon,
  BookUser,
  Shield,
  Eye,
  HeartMinus
} from 'lucide-react'
import { Button } from '@heroui/button'
import { useSettingStore } from '~/store/settingStore'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

// 1. 优化后的 NSFWNotice：文字更大，卡片更醒目
const NSFWNotice = ({ nsfwStatus }: { nsfwStatus: string }) => {
  const isSFW = nsfwStatus === 'sfw'
  const isNSFW = nsfwStatus === 'nsfw'
  const isAll = nsfwStatus === 'all'

  if (isSFW) {
    return (
      <div className="mx-2 mb-3 p-3.5 bg-primary/20 border border-primary/40 rounded-xl">
        <div className="flex items-start gap-2.5 leading-snug text-foreground">
          <Shield className="w-4.5 h-4.5 text-danger flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <div className="font-bold text-[11.5px] text-danger">
              部分 Galgame 已被隐藏
            </div>
            <div className="text-[10.5px] text-default-600 dark:text-default-400">
              网站未启用 NSFW, 部分 Galgame 不可见, 要查看所有内容,
              请在顶部导航栏切换模式。
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isNSFW || isAll) {
    return (
      <div className="mx-2 mb-3 p-3.5 bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 rounded-xl text-pink-600 dark:text-pink-400">
        <div className="flex items-start gap-2.5 leading-snug">
          <Eye className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <div className="font-bold text-[11.5px]">网站已进入 NSFW 模式</div>
            <div className="text-[10.5px]">
              您可访问本站所有内容，可能含有 R18
              内容，请勿在公共场所浏览，以免造成不必要的困扰。
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const navSections = [
  {
    title: '推荐内容',
    items: [
      {
        name: 'Ai女友💋',
        description: '顶尖色情，即刻生图😍',
        href: 'https://genrati.xyz?ref_id=006f5ccb-b0d3-471b-a674-de5e5114ed67',
        icon: HeartIcon
      },
      {
        name: '精品飞机杯',
        description: 'AYU-4396 没落女仆教育😍',
        href: 'https://s.tb.cn/c.0x1IWF',
        icon: HeartIcon
      },
      {
        name: '翻墙Vpn推荐',
        description: '加速下载，加载更丝滑！',
        href: 'https://eueua.cc/#/register?code=V437MLYw',
        icon: HeartIcon
      }
    ]
  },
  {
    title: '核心功能',
    items: [
      { name: '首页', description: '网站首页', href: '/', icon: Home },
      {
        name: 'Galgame',
        description: 'Galgame 本体获取',
        href: '/galgame',
        icon: Gamepad2
      },
      {
        name: '模拟器及教程',
        description: '模拟器及使用教程',
        href: '/tutorial',
        icon: BookUser
      },
      {
        name: '补丁和存档',
        description: '游戏补丁与存档',
        href: '/resource',
        icon: FileText
      }
    ]
  },
  {
    title: '游戏信息',
    items: [
      {
        name: '游戏标签',
        description: '按标签浏览游戏',
        href: '/tag',
        icon: Tags
      },
      {
        name: '制作会社',
        description: '按会社浏览游戏',
        href: '/companies',
        icon: Building
      }
    ]
  },
  {
    title: '社区交流',
    items: [
      {
        name: '评论列表',
        description: '最新评论动态',
        href: '/comment',
        icon: MessagesSquare
      },
      { name: '话题列表', description: '最新话题', href: '/topic', icon: Hash }
    ]
  }
]

const MobileSidebarComponent = ({ isOpen, onClose }: MobileSidebarProps) => {
  const pathname = usePathname()
  const nsfwEnable = useSettingStore((state) => state.data.kunNsfwEnable)
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const frame = requestAnimationFrame(() => setIsAnimate(true))
      document.body.style.overflow = 'hidden'
      return () => cancelAnimationFrame(frame)
    } else {
      setIsAnimate(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!shouldRender && !isOpen) return null

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-300 z-[100]',
          isAnimate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 w-[210px] bg-background z-[101] flex flex-col',
          'transform transition-transform duration-300 ease-out shadow-2xl',
          isAnimate ? 'translate-x-0' : '-translate-x-full'
        )}
        onTransitionEnd={() => !isOpen && setShouldRender(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-divider">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image
              src="/favicon.webp"
              alt="Logo"
              width={24}
              height={24}
              className="rounded-lg"
            />
            <span className="font-bold text-[13px] text-primary">
              {kunMoyuMoe.creator.name}
            </span>
          </Link>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            radius="full"
            onPress={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
          <NSFWNotice nsfwStatus={nsfwEnable} />

          {navSections.map((section, index) => {
            const isAdSection = section.title === '推荐内容'

            return (
              <React.Fragment key={section.title}>
                {/* 隔离横线 */}
                {index > 0 && !isAdSection && (
                  <div className="mx-4 my-1.5 border-t border-divider/60" />
                )}

                <div
                  className={cn(
                    'mb-2 px-1',
                    // 推荐内容板块：缩小了内边距(p-1.5)和间距(mb-3)，使其更紧凑
                    isAdSection &&
                      'mx-1.5 mb-3 p-1.5 bg-default-50 dark:bg-default-100/10 border border-primary/30 rounded-xl shadow-inner backdrop-blur-sm'
                  )}
                >
                  <h2
                    className={cn(
                      'px-2.5 py-1 text-[10px] font-bold uppercase mb-0.5',
                      isAdSection ? 'text-primary' : 'text-default-400'
                    )}
                  >
                    {isAdSection ? '✨ ' + section.title : section.title}
                  </h2>

                  <ul className="space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-start p-1.5 mx-1 rounded-lg transition-colors',
                            pathname === item.href
                              ? 'bg-primary/10 text-primary font-bold'
                              : 'active:bg-default-100 text-foreground'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'w-4 h-4 mt-0.5 flex-shrink-0',
                              pathname === item.href
                                ? 'text-primary'
                                : isAdSection
                                  ? 'text-primary'
                                  : 'text-default-500'
                            )}
                          />

                          <div className="flex flex-col ms-2.5 min-w-0">
                            <span className="text-[12.5px] font-semibold leading-tight break-words">
                              {item.name}
                            </span>
                            <span
                              className={cn(
                                'text-[10px] mt-0.5 leading-snug break-words font-normal',
                                pathname === item.href
                                  ? 'text-primary/80'
                                  : 'text-default-500'
                              )}
                            >
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </aside>
    </>
  )
}

export const MobileSidebar = memo(MobileSidebarComponent)
