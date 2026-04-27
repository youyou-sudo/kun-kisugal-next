'use client'

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
  Eye
} from 'lucide-react'
import { Button } from '@heroui/button'
import { memo, useEffect, useState } from 'react'
import { useSettingStore } from '~/store/settingStore'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

// 这里的 navSections 内容已根据你的 PC 端代码完全同步
const navSections = [
  {
    title: '推荐内容',
    items: [
      {
        name: 'Ai女友💋',
        description:
          '🌟在线畅玩。顶尖色情，即刻生图😍多样角色场景18禁性癖待你开发！💋',
        href: 'https://genrati.xyz?ref_id=006f5ccb-b0d3-471b-a674-de5e5114ed67',
        icon: HeartIcon
      },
      {
        name: '精品飞机杯',
        description: 'AYU-4396 没落女仆のメイド教育😍',
        href: 'https://s.tb.cn/c.0x1IWF',
        icon: HeartIcon
      },
      {
        name: '⚡️翻墙Vpn推荐',
        description:
          '翻墙Vpn推荐，加速下载！觉得下载资源慢？觉得加载页面不丝滑？',
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
        name: '模拟器及使用教程',
        description: 'Galgame 模拟器及使用教程',
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
  const settings = useSettingStore((state) => state.data)
  const [shouldRender, setShouldRender] = useState(isOpen)

  // 原有逻辑：控制 Body 滚动锁
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setShouldRender(true)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== 'transform') return
    if (!isOpen) setShouldRender(false)
  }

  // 1:1 移植 PC 端的 NSFW 提醒逻辑
  const NSFWNotice = () => {
    const isSFW = settings.kunNsfwEnable === 'sfw'
    const isNSFW = settings.kunNsfwEnable === 'nsfw'
    const isAll = settings.kunNsfwEnable === 'all'

    if (isSFW) {
      return (
        <div className="mx-3 mb-2 p-3 bg-primary/20 border border-primary/40 rounded-lg">
          <div className="flex items-start gap-2 text-[11px] leading-snug">
            <Shield className="w-3.5 h-3.5 text-danger mt-0.5 flex-shrink-0" />
            <span>
              部分内容已隐藏。如需查看所有 Galgame，请在导航栏开启 NSFW 模式。
            </span>
          </div>
        </div>
      )
    }

    if (isNSFW || isAll) {
      return (
        <div className="mx-3 mb-2 p-3 bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 rounded-lg">
          <div className="flex items-start gap-2 text-[11px] leading-snug text-pink-600 dark:text-pink-400">
            <Eye className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              网站已进入 NSFW 模式，可能含有 R18 内容，请注意周围环境。
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  if (!shouldRender) return null

  return (
    <>
      {/* 遮罩逻辑保留 */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* 弹出栏逻辑保留：translate 控制平移 */}
      <div
        className={cn(
          'fixed top-0 left-0 bottom-0 w-[260px] bg-background z-50 flex flex-col',
          'transform transition-transform duration-300 ease-out shadow-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image
              src="/favicon.webp"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-primary">
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
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 scrollbar-hide">
          <NSFWNotice />

          {navSections.map((section) => {
            const isAdSection = section.title === '推荐内容'

            return (
              <div
                key={section.title}
                className={cn(
                  'mb-4 px-2',
                  isAdSection &&
                    'mx-2 p-3 bg-default-50 dark:bg-default-100/10 border border-primary/50 rounded-xl shadow-sm backdrop-blur-sm'
                )}
              >
                <h2
                  className={cn(
                    'px-3 py-1 text-[11px] font-bold uppercase mb-1',
                    isAdSection ? 'text-primary' : 'text-default-400'
                  )}
                >
                  {isAdSection ? '✨ ' + section.title : section.title}
                </h2>

                <ul className="space-y-1">
                  {section.items.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={onClose} // 点击关闭侧栏逻辑
                        className={cn(
                          'flex items-start p-2 rounded-lg transition-colors',
                          pathname === item.href
                            ? 'bg-primary text-primary-foreground'
                            : 'active:bg-default-100 text-foreground'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'w-5 h-5 mt-0.5 flex-shrink-0',
                            pathname === item.href
                              ? 'text-primary-foreground'
                              : isAdSection
                                ? 'text-primary'
                                : 'text-default-500'
                          )}
                        />

                        <div className="flex flex-col ms-3 min-w-0">
                          {/* 字体大小严格对齐：标题 sm，副标题 xs */}
                          <span className="text-sm font-semibold leading-tight">
                            {item.name}
                          </span>
                          <span
                            className={cn(
                              'text-xs mt-1 leading-normal break-words',
                              pathname === item.href
                                ? 'text-primary-foreground/80'
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
            )
          })}
        </div>
      </div>
    </>
  )
}

export const MobileSidebar = memo(MobileSidebarComponent)
