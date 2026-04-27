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

const navSections = [
  {
    title: '推荐内容',
    items: [
      {
        name: 'Ai女友💋',
        description: '🌟在线畅玩。顶尖色情，即刻生图😍场景18禁性癖待你开发！💋', // 缩减了文字长度
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
        description: '翻墙加速下载！觉得资源慢？加载不丝滑？',
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
  const settings = useSettingStore((state) => state.data)
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isAnimate, setIsAnimate] = useState(false)

  // 动画控制核心：确保组件挂载后延迟触发动画，避免首刷无动画
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const timer = setTimeout(() => setIsAnimate(true), 10) // 微延迟
      document.body.style.overflow = 'hidden'
      return () => clearTimeout(timer)
    } else {
      setIsAnimate(false)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== 'transform') return
    if (!isOpen) setShouldRender(false)
  }

  const NSFWNotice = () => {
    const isSFW = settings.kunNsfwEnable === 'sfw'
    const isNSFW = settings.kunNsfwEnable === 'nsfw'
    const isAll = settings.kunNsfwEnable === 'all'

    if (isSFW) {
      return (
        <div className="mx-2 mb-2 p-2 bg-primary/20 border border-primary/40 rounded-lg">
          <div className="flex items-start gap-1.5 text-[10px] leading-tight">
            <Shield className="w-3 h-3 text-danger mt-0.5 flex-shrink-0" />
            <span>NSFW 内容已隐藏。</span>
          </div>
        </div>
      )
    }

    if (isNSFW || isAll) {
      return (
        <div className="mx-2 mb-2 p-2 bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 rounded-lg">
          <div className="flex items-start gap-1.5 text-[10px] leading-tight text-pink-600 dark:text-pink-400">
            <Eye className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span>进入 NSFW 模式。</span>
          </div>
        </div>
      )
    }
    return null
  }

  if (!shouldRender) return null

  return (
    <>
      {/* 遮罩 */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isAnimate ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* 侧栏 - 宽度缩小至 210px */}
      <div
        className={cn(
          'fixed top-0 left-0 bottom-0 w-[210px] bg-background z-50 flex flex-col',
          'transform transition-transform duration-300 ease-out shadow-2xl',
          isAnimate ? 'translate-x-0' : '-translate-x-full'
        )}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="flex items-center justify-between p-3 border-b border-divider">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image
              src="/favicon.webp"
              alt="Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-bold text-sm text-primary">
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
          <NSFWNotice />

          {navSections.map((section) => {
            const isAdSection = section.title === '推荐内容'

            return (
              <div
                key={section.title}
                className={cn(
                  'mb-3 px-1.5',
                  isAdSection &&
                    'mx-1.5 p-2 bg-default-50 dark:bg-default-100/10 border border-primary/40 rounded-xl shadow-sm backdrop-blur-sm'
                )}
              >
                <h2
                  className={cn(
                    'px-2 py-1 text-[10px] font-bold uppercase mb-0.5',
                    isAdSection ? 'text-primary' : 'text-default-400'
                  )}
                >
                  {isAdSection ? '✨ ' + section.title : section.title}
                </h2>

                <ul className="space-y-0.5">
                  {section.items.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-start p-1.5 rounded-lg transition-colors',
                          pathname === item.href
                            ? 'bg-primary text-primary-foreground'
                            : 'active:bg-default-100 text-foreground'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'w-4 h-4 mt-0.5 flex-shrink-0',
                            pathname === item.href
                              ? 'text-primary-foreground'
                              : isAdSection
                                ? 'text-primary'
                                : 'text-default-500'
                          )}
                        />

                        <div className="flex flex-col ms-2 min-w-0">
                          {/* 标题缩小至 13px */}
                          <span className="text-[13px] font-semibold leading-tight">
                            {item.name}
                          </span>
                          {/* 描述缩小至 10.5px */}
                          <span
                            className={cn(
                              'text-[10.5px] mt-0.5 leading-snug break-words',
                              pathname === item.href
                                ? 'text-primary-foreground/80'
                                : 'text-default-400'
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
