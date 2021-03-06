import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
// @ts-ignore
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "UnitStore",
    store,
})
export default class UnitStore extends VuexModule {
    @Mutation
    public setProjectNameList(data:any) { 
        
    }

    @Mutation
    public setSUnitName(data:string) { 
        
    }

    @Mutation
    public setSStatus(data:number) { 
        
    }

    @Mutation
    public setSProjectName(data:string) { 
        
    }

    @Mutation
    public setGetProjectName(data:any) { 
        
    }
    @Mutation
    public setPageInfo(data: any) { 
        
    }
    @Mutation
    private selectStatus(data: number) {
        this.sStatus = data;
    }
    @Mutation
    public selectProjectName(data: string) {
        this.sProjectName = data;
    }
    @Mutation
    public selectUnitName(data: string) {
        this.sUnitName = data;
    }
    @Mutation
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    public setPageIndex(data: number) { 
        this.pageIndex = data;
    }
    @Mutation
    public setPageTotal(data: number) {
        this.conditionList = [];
        this.pageTotal = data;
    }
    @Mutation
    public setProject_name(data:string) { 
        this.project_name=data;
    }
    @Mutation
    public setPrincipal(data:string) { 
        this.principal = data;
    }
    @Mutation
    public setUnit_type(data:number) { 
        this.unit_type = data;
    }
    @Mutation
    public setPeople_number(data:string) { 
        this.people_number = data;
    }
    @Mutation
    public setEntrance_time(data:Date) { 
        this.entrance_time = data;
    }
    @Mutation
    public setUnit_name(data:string) { 
        this.unit_name = data;
    }
    @Mutation
    public setUnit_number(data:string) { 
        this.unit_number = data;
    }
    @Mutation
    public setProject_license(data:string) { 
        this.project_license = data;
    }
    @Mutation
    public setProject_id(data:number) {
        this.project_id = data;
    }
    @Mutation
    public setId(data:number) { 
        this.id = data;
    }
    @Mutation
    public setStatus(data:number) {
        this.status = data;
    }



    public unit:any;
    public projectNameList:any;

    public id:number;
    public project_id:number;
    public project_license:string;
    public unit_number:string;
    public unit_name:string;
    public entrance_time:Date;
    public people_number:string;
    public unit_type:number;
    public principal:string;
    public project_name:string;
    public status:number;

    public sProjectName:string;
    public sStatus:number;
    public sUnitName:string;

    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;
    public unitType: Array<UnitType>;
    public uplodId:Array<any>;
    public conditionList:Array<any>;

    constructor(e) {
        super(e);
        //分页
        this.pageIndex= 1;
        this.pageSize=20;
        this.pageTotal = 0;
        this.unitType = [];
        this.uplodId = [];
        this.conditionList = [];
        //获取工程列表数据
        this.unit = [];
        //获取项目列表
        this.projectNameList = [];

        this.id=null;
        this.project_id=null;
        this.project_license="";
        this.unit_number="";
        this.unit_name="";
        this.entrance_time=null;
        this.people_number="";
        this.unit_type=0;
        this.principal="";
        this.project_name="";
        this.status=null;
        //条件查询
        this.sProjectName="";
        this.sStatus=null;
        this.sUnitName="";

    }
    @Action
    public getUploadParams() : any {

        return {

            "conditionList": [{
                "name": "u.unit_id",
                "value":  this.uplodId.map(x => x.unit_id),
                "algorithm": "IN"
            }],
            "keywords" : [],
            "selectList": [
                {"field": "u.unit_number" ,"alias":"参建单位编号"},
                {"field": "u.unit_name" ,"alias":"参建单位名称"},
                {"field": "b.worker_count" ,"alias":"当前人数"},
                {"field": "u.principal","alias":"负责人" }
            ]
        };
    }
    @Action
    public getParams() : any {

        if(this.sUnitName){
            let item ={};
            item["name"]="unit_name";
            item["value"]=this.sUnitName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": this.conditionList,

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        };
    }
    @Action
    public async getProject() {
        await request.post('/api/workerlib/project', {
            "pageInfo" : {},

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": [
                { "field": "project_id"},
                {"field": "project_name"}
                ]
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successProject(data);
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }

            alert.warning(e.message || e)
        });
    }
    @Action
    public async search() {
        await request.post('/api/workerlib/unitview',await this.getParams()).then((data)=>{
            if(!data){
                return;
            }
            this.success(data);
            this.count();
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }

            alert.warning(e.message || e)
        });
    }
    @Action
    public async upload() {
        let alert: any = Message;
        await request.post('/api/workerlib/userview/export',await this.getUploadParams(),
            {responseType: 'blob', params: '项目工程档案'}).then((data)=>{
                if(!data){
                    return;
                }
                alert.warning('成功！');
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async synchronization() {
        let alert: any = Message;
        await request.post('/unit/SynUnit').then((data)=>{
            if(!data){
                return;
            }
            this.sucessSynchronization(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async insertUnit() {
        await request.put('/api/workerlib/unit', {
            "unit_id":null,
            "project_id":this.project_id,
            "project_license":this.project_license,
            "unit_number":this.unit_number,
            "unit_name":this.unit_name,
            "people_number":this.people_number,
            "unit_type":this.unit_type,
            "entrance_time":this.entrance_time ? this.entrance_time.getFullYear() + "-" + this.entrance_time.getMonth() + "-" + this.entrance_time.getDate():null,
            "principal":this.principal,
            "status":this.status
        }).then((data)=>{
            if(!data){
                return;
            }
            this.added(data)
        }).catch((e)=>{
            console.log(e)

            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return;
            }

            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }

            if(!e.message) {
                return;
            }

            alert.warning(e.message || e)
        });
    }
    @Action
    public async getUnitType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "单位类型",
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async count() {
        await request.post('/api/workerlib/unitview/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public added(data: any) {
        if(data.status == 0) {
            this.search();
        }
    }
    @Action
    private sucessSynchronization(data: any) {
        if(data.status == 0){
            this.search();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
    @Mutation
    public successType(data: any) {
        this.unitType = data.data;
    }
    @Mutation
    private setUplodId(data: any) {
        this.uplodId.push(data);
    }
    @Mutation
    private success(data: any) {
        this.unit = data.data;
    }
    @Mutation
    private successProject(data:any){
        this.projectNameList = data.data;
    }

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '参建单位编号',
            key: 'unit_number',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.unit_number
                        }
                    }, params.row.unit_number)
                ])
            }
        },
        {
            title: '参建单位名称',
            key: 'unit_name',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.unit_name
                        }
                    }, params.row.unit_name)
                ])
            }
        },
        {
            title: '当前人数',
            slot: 'worker_count',
            sortable: true
        },
        // {
        //     title: '单位类型',
        //     key: 'unit_type',
        //     sortable: true
        // },
        // {
        //     title: '入场日期',
        //     key: 'entrance_time',
        //     sortable: true
        // },
        {
            title: '法人代表',
            key: 'principal',
            sortable: true
        }
    ];



}
interface UnitType {
    value?: string;
    name?: string;
}

