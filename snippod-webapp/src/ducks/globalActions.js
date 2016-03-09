export const INIT_ALL_STATE = 'reducer/INIT_ALL_STATE';
export const DELETE_ALL_PAGINATIONS = 'reducer/DELETE_ALL_PAGINATIONS';
export const DELETE_ALL_ENTITIES = 'reducer/DELETE_ALL_ENTITIES';
export const UPDATE_ENTITY = 'reducer/UPDATE_ENTITY';
export const DELETE_ENTITY = 'reducer/DELETE_ENTITY';

// Resets ALL State
export function initAllState() {
  return {
    type: INIT_ALL_STATE
  };
}

export function deleteAllPaginations() {
  return {
    type: DELETE_ALL_PAGINATIONS
  };
}

export function deleteAllEntities() {
  return {
    type: DELETE_ALL_ENTITIES
  };
}

export function updateEntity(kind, id, entity) {
  return {
    type: UPDATE_ENTITY,
    kind,
    id,
    entity
  };
}

export function deleteEntity(kind, id) {
  return {
    type: DELETE_ENTITY,
    kind,
    id
  };
}
