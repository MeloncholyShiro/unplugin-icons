import { isPackageExists, getPackageInfo } from 'local-pkg'
import createDebugger from 'debug'
import { Options, ResolvedOptions } from '../types'

const debug = createDebugger('unplugin-icons:options')

export async function resolveOptions(options: Options): Promise<ResolvedOptions> {
  const {
    scale = 1.2,
    defaultStyle = '',
    defaultClass = '',
    compiler = await guessCompiler(),
    jsx = guessJSX(),
    customCollections = {},
    autoInstall = false,
    css = {},
  } = options

  const webComponents = Object.assign({
    autoDefine: false,
    iconPrefix: 'icon',
  }, options.webComponents)

  debug('compiler', compiler)

  return {
    scale,
    defaultStyle,
    defaultClass,
    customCollections,
    compiler,
    jsx,
    webComponents,
    autoInstall,
    css,
  }
}

async function guessCompiler(): Promise<ResolvedOptions['compiler']> {
  return await getVueVersion() || (isPackageExists('@svgr/core') ? 'jsx' : 'vue3')
}

function guessJSX(): ResolvedOptions['jsx'] {
  if (isPackageExists('preact'))
    return 'preact'
  return 'react'
}

async function getVueVersion() {
  try {
    const result = await getPackageInfo('vue')
    if (!result)
      return null
    return result.version.startsWith('2.') ? 'vue2' : 'vue3'
  }
  catch {
    return null
  }
}
