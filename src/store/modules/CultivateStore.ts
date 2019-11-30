import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CultivateStore",
    store,
})
export default class CultivateStore extends VuexModule {

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '培训课程',
            key: 'course',
            sortable: true
        },
        {
            title: '开始培训时间',
            key: 'time',
            sortable: true
        },
        {
            title: '培训人数',
            key: 'people',
            sortable: true
        },
        {
            title: '任务状态',
            key: 'state',
            sortable: true
        },
        {
            title: '完成进度',
            key: 'schedule',
            sortable: true
        },
        {
            title: '发起人',
            key: 'initiator',
            sortable: true
        },
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];

    public data = [
        {
            course: '岗前通用安全教育培训',
            time: '2019-01-01',
            people: '10',
            state: '待学习',
            schedule: '0',
            initiator: '裴灏杰'
        },
        {
            course: '钢筋工岗前知识培训',
            time: '2019-01-01',
            people: '12',
            state: '学习中',
            schedule: '88',
            initiator: '范佳超'
        },
        {
            course: '电焊工岗前知识培训',
            time: '2019-01-01',
            people: '15',
            state: '学习中',
            schedule: '55',
            initiator: '林陆锐'
        },
        {
            course: '水泥工岗前知识培训',
            time: '2019-01-01',
            people: '8',
            state: '学习完成',
            schedule: '100',
            initiator: '陈吕'
        }
    ];

}
