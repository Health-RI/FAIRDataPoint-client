import _ from 'lodash'
import { EntityConfig, EntitySpec } from '@/entity/EntityConfig'
import { RepositoryConfig } from '@/entity/RepositoryConfig'

type EntityState = {
  entityConfigs: Record<string, EntityConfig>
}

const getEntitySpec = (config: unknown): EntitySpec | undefined => (
  (_.get(config, 'entitySpec') ?? _.get(config, 'spec')) as EntitySpec | undefined
)

const getSpecsByUuid = (state: EntityState) => (
  Object.values(state.entityConfigs).reduce<Record<string, any>>((acc, config) => {
    const spec = getEntitySpec(config)

    if (spec?.uuid) {
      acc[spec.uuid] = spec
    }

    return acc
  }, {})
)

const normalizeConfig = (state: EntityState, config: unknown) => {
  if (!config) return undefined

  if (typeof _.get(config, 'api.get') === 'function') {
    return config as EntityConfig
  }

  const spec = getEntitySpec(config)
  if (!spec) return undefined

  const Config = spec.urlPrefix ? EntityConfig : RepositoryConfig
  return new Config(spec, getSpecsByUuid(state))
}

const getConfigFor = (state: EntityState, entity?: string) => (
  entity === undefined || entity === null
    ? undefined
    : normalizeConfig(state, _.get(state.entityConfigs, entity))
)

export function createEntitiesModule(entityConfigs: Record<string, EntityConfig>) {
  return {
    namespaced: true,

    state: {
      entityConfigs,
    },

    getters: {
      config: (state: EntityState) => (entity: string) => getConfigFor(state, entity),
      parentConfig: (state: EntityState) => (entity: string) => getConfigFor(
        state,
        _.get(getConfigFor(state, entity), 'parentEntity'),
      ),
      configByUuid: (state: EntityState) => (uuid: string) => (
        Object.values(state.entityConfigs).map(
          (config) => normalizeConfig(state, config),
        ).find(
          (cfg) => cfg?.uuid === uuid,
        )
      ),
    },
  }
}
