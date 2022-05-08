import { writable } from 'svelte/store';
import type { Template } from "../app";
import { browser } from '$app/env';

export const templates = createTemplates();

function createTemplates() {
  const tmpls: Map<string, Template> = loadTemplates();
  const { subscribe, set, update} = writable(tmpls);
  return {
    subscribe,
    set,
    get(id: string): Template | undefined {
      return tmpls.get(id);
    },
    add(tmpl: Template) {
      if (tmpl === null) {
        return tmpls;
      }
      update(() => {
        tmpls.set(tmpl.id, tmpl);
        return tmpls;
      });
      storeTemplates(tmpls);
    },
    remove(tmpl: Template) {
      update(() => {
        tmpls.delete(tmpl.id);
        return tmpls;
      });
      storeTemplates(tmpls);
    }
  };

}

function loadTemplates(): Map<string, Template> {
  const map = new Map<string, Template>();

  if (!browser) {
    return map;
  }
  
  const json = localStorage.getItem('faztype-tmpls');
  if (!json){
    return map;
  }

  try {
    const list = JSON.parse(json);
    for(const item of list) {
      if (!item || item.length != 2) {
        continue;
      } 
      map.set(item[0], item[1]);
    }
  } catch (e) {
    console.log(e);
  }
  
  return map;
}

function storeTemplates(tmpls: Map<string, Template>) {
  if (browser ) {
    localStorage.setItem('faztype-tmpls', JSON.stringify([...tmpls]));
  }
}