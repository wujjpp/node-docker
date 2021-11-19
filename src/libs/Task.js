/**
 * Created by Wu Jian Ping on - 2018/08/28.
 */

import Compoment from './Compoment'

export default class Task extends Compoment {
  /**
   *
   * desired-state=(running | shutdown | accepted)
   * id=<task id>
   * label=key or label="key=value"
   * name=<task name>
   * node=<node id or name>
   * service=<service name>
   */
  ls(serviceName, desiredState, taskId, label, taskName, node) {
    return this.request.get('/tasks', {
      params: {
        'desired-state': desiredState,
        id: taskId,
        label,
        name: taskName,
        node,
        service: serviceName
      }
    })
  }

  inspect(id) {
    return this.request.get(`/task/${id}`, {
      params: {
        id
      }
    })
  }
}
