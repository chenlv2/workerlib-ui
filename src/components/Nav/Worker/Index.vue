<script lang="ts">
    import "@/assets/css/common.css";
    import WorkerStore from '../../../store/modules/WorkerStore';
    import CommentsStore from '../../../store/modules/CommentsStore';
    import { Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import { Message } from 'iview';

    @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        computed: {
            menuitemClasses: () => {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    })
    export default class Worker extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        loading = true;
        private store: any;
        private storeComm: any;
        public addWorker: boolean;
        public particulars: boolean;
        public onLeave: boolean;
        public certificate: boolean;

        public disabled:boolean;
        public uploadData:boolean;
        public onUp:boolean;
        public offLeave :boolean;
        public sex: string;
        public options!: any;
        public optionsSex!: any;
        public now: Date;
        public year :any;
        public date:any;
        constructor() {
            super();
            this.store = getModule(WorkerStore)
            this.storeComm = getModule(CommentsStore)
            this.addWorker = false;
            this.uploadData = false;
            this.onUp = false;
            this.particulars = false;
            this.certificate = false;
            this.onLeave = false;
            this.offLeave =false;
        }
        mounted() {
        	this.store.findRole();
            if(this.store.notIn){
                if(this.store.notIn == true){
                    this.store.searchNot();
                    this.store.getProjectType();
                    this.store.selectProject();
                }
            }else if(this.store.in){
                if(this.store.in == true){
                    this.store.searchIn();
                    this.store.getProjectType();
                    this.store.selectProject();
                }
            }else {
                this.store.search();
                this.store.getProjectType();
                this.store.selectProject();
            }
        }
        search(){
            this.store.search();
        }
        changeIn(){
            this.store.setNotIn(false);
        }
        changeNot(){
            this.store.setIn(false);
        }

        get getNotIn():boolean{
            return this.store.notIn;
        }
        set getNotIn(data:boolean){
            this.store.setNotIn(data);
        }

        get getIn():boolean{
            return this.store.in;
        }
        set getIn(data:boolean){
            this.store.setIn(data);
        }
        getCommentSparticularsList():any{
            return this.storeComm.commentSparticularsList;
        }
        handleSuccessPhoto (res, file) {
            this.store.setPhoto(res.file);
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        handleSuccessExcel (res, file) {
            if(res.status == 0){
                let alert: any = Message;
                alert.warning('成功！');
                this.store.search();
            }
        }
        handleFormatErrorExcel (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！xls、xlsx格式文件！');
        }
        handleSuccessIdCardfront (res, file) {
            this.store.setIdCardfront(res.file);
        }
        handleSuccessIdCardReverse (res, file) {
            this.store. setIdCardReverse(res.file);
        }
        handleSuccessCertificate (res, file) {
            this.store. setCertificate(res.file);
        }
        getPeopleList():any{
            return this.store.peoples;
        }
        selectUnit(){
            this.store.selectUnit();
        }
        getUnitList():any{
            return this.store.unitList;
        }
        getProjectList():any{
            return this.store.projectList;
        }
        getInvolvedProjectList():any{
            return this.store.involvedProjectInfo;
        }
        getCultivateList():any{
            return this.store.cultivateList;
        }
        getDateFormat (d: number) : string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        }

        viewData(id,idNum) {
            this.particulars=!this.particulars;
            this.store.setInfoId(id);
            this.store.setInfoIdNumber(idNum);

            this.store.searchInfo();
            this.store.searchInvolvedProject();
            this.store.selectCultivate();
            this.store.selectCheckWorkce();
            this.store.selectCheckWorkceMonth();
            this.store.selectSalary();
            this.store.selectComments();
            this.storeComm.setPunishmentsId(id);
            this.storeComm.searchCommentSparticulars();
        }
        checkLeave() {
            this.onLeave=!this.onLeave;
        }
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '在场', key: 1 },
                {value: '离场', key: 2 }

            ];
            return this.options;
        }
        getSex() : any {
            if(this.optionsSex) return this.optionsSex;
            this.optionsSex = [
                {value: '男', key: 1 },
                {value: '女', key: 2 }

            ];
            return this.optionsSex;
        }
        getType(){
            return this.store.projectType
        }
        //获取性别
        checkSex(idNumber): boolean {
            if(!idNumber) return;
            this.sex = idNumber.substring(16,17);
            if(this.sex=="1"||this.sex=="3"||this.sex=="5"||this.sex=="7"||this.sex=="9"){
                return true;
            }else {
                return false;
            }
        }
        //获取年龄
        getAge(idNumber): number{
            if(!idNumber) return;
            this.now = new Date();
            this.year = this.now.getTime();
            this.date = new Date(idNumber.substring(6,10)+","+idNumber.substring(10,12)+","+idNumber.substring(12,14)).getTime();
            // return Math.floor((this.year)/(1000*60*60*24));
            return Math.floor((this.year-this.date)/(1000*60*60*24*31*12));
        }
        messageWarningFn (text) {
            let alert: any = Message;
            alert.warning(text);
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                })
            }, 500)
        }
        okUpload():any{
            this.uploadData = false;
        }
        cancelUpload():any{
            this.uploadData = false;
        }
        okUp():any{
            this.store.setCheck(this.store.checkeds.filter(x => x.id).map(x => x.id));
            this.store.upload();
            this.store.successUpload();
            this.onUp = false;
        }
        cancelUp():any{
            this.onUp = false;
        }
        ok() : any{
            if(!this.store.userName){
                this.messageWarningFn('请输入姓名！');
                return;
            }
            if(!this.store.card){
                this.messageWarningFn('请输入身份证号！');
                return;
            }
            if(!this.store.phone){
                this.messageWarningFn('请输入手机号码！');
                return;
            }
            if(!this.store.type){
                this.messageWarningFn('请选择工种！');
                return;
            }
            this.store.insertArchives();
            this.addWorker = false;
        }
        cancel():any {
            this.addWorker = false;
        }
        okLeave() : any{
            if(this.store.checkeds.filter(x => x.leave=== 1).map(a=>a.leave)[0] == 1) {
                this.store.setCheck(this.store.checkeds.filter(x => x.eafId).map(x => x.eafId));
                this.store.setOnLeave(2);
                this.store.update();
            }else {
                this.store.setCheck(this.store.checkeds.filter(x => x.eafId).map(x => x.eafId));
                this.store.setOnLeave(1);
                this.store.update();
            }
            this.onLeave = false;
        }
        cancelLeave():any {
            this.onLeave = false;
        }
        upload():any{
            this.onUp = true;
        }
        particularsOk() : any{
            this.particulars = false;
        }
        particularsCancel():any {
            this.particulars = false;
        }
        certificateOpen():any {
            this.particulars = false;
            this.certificate=true;
        }
        certificateOk() : any{
            this.certificate = false;
            this.particulars = true;
        }
        certificateCancel():any {
            this.certificate = false;
            this.particulars = true;
        }
        onCheck(id: number,name:string,leave:number): void {
            var itemTrue = {};
            if(this.store.checkeds.findIndex(x => x.id == id) > -1) {
                let index = this.store.checkeds.findIndex(x => x.id == id);
                this.store.checkeds.splice(index, 1);
                return;
            }
            itemTrue['id'] = id;
            itemTrue['name'] = name;
            itemTrue['leave'] = leave;
            this.store.setChecked(itemTrue);
        }
        isdisabledFn():any{

            let disabledTrue = this.store.checkeds.findIndex(x => x.leave== 1);  //在场
            let disabledFalse = this.store.checkeds.findIndex(x => x.leave== 2); //离场
            if(disabledTrue > -1  && disabledFalse > -1 || disabledTrue <0 && disabledFalse<0){   //同时选中禁用
                this.disabled = true;
            }else {
                if(disabledTrue < 0  && disabledFalse> -1){
                    this.offLeave = true;
                }else {
                    this.offLeave = false;
                }
                this.disabled = false;
            }
            return this.disabled;
        }
        isChecked(id): boolean {
            if(this.store.checkeds.find(x => x.id == id)){
                return true;
            }
            return false;
        }
        onPageSizeChange(pageSize){
            this.store.setPageSize(pageSize);
            this.store.setPageIndex(1);
            this.onPageIndexChange(1);
        }
        onPageIndexChange(pageIndex){
            this.store.setPageIndex(pageIndex);
            this.store.search();
        }
        onInPageSizeChange(pageSize){
            this.store.setInPageIndex(pageSize);
            this.store.setInPageIndex(1);
            this.onInPageIndexChange(1);
        }
        onInPageIndexChange(pageIndex){
            this.store.setInPageIndex(pageIndex);
            this.store.searchInvolvedProject();
        }

        set infoId(data:number){
            this.store.setInfoId(data);
        }
        get infoId():number{
            return this.store.infoId;
        }
        set userName(data:string){
            this.store.setUserName(data);
        }
        get userName():string{
            return this.store.userName;
        }

        set card(data:string){
            this.store.setCard(data);
        }
        get card():string{
            return this.store.card;
        }

        set phone(data:number){
            this.store.setPhone(data);
        }
        get phone():number{
            return this.store.phone;
        }

        set type(data:string){
            this.store.setType(data);
        }
        get type():string{
            if(!this.store.type) {
                return '';
            }
            return this.store.type.toString().split(",");
        }

        set project(data:string){
            this.store.setProject(data);
        }
        get project():string{
            return this.store.project;
        }

        set projectId(data:string){
            this.store.setProject(this.store.projectList.filter(x => x.id == data)[0].project_name);
            this.store.setProjectId(data);
        }
        get projectId():string{
            return this.store.projectId;
        }
        set unitId(data:number){
            this.store.setUnitId(data);
        }
        get unitId():number{
            return this.store.unitId;
        }
        set unit(data:string){
            this.store.setUnit(data);
        }
        get unit():string{
            return this.store.unit;
        }

        set animal(data:string){
            this.store.setAnimal(data);
        }
        get animal():string{
            return this.store.animal;
        }

        set startTime(data:Date){
            this.store.setStartTime(data);
        }
        get startTime():Date{
            return this.store.startTime;
        }

        set endTime(data:string){
            this.store.setEndTime(data);
        }
        get endTime():string{
            return this.store.endTime;
        }

        set pageTotal(data:number){
            this.store.setPageToatl(data);
        }
        get pageTotal():number{
            return this.store.pageTotal;
        }

        set inPageTotal(data:number){
            this.store.setInPageTotal(data);
        }
        get inPageTotal():number{
            return this.store.inPageTotal;
        }

        set selectProjectName(data:string){
            this.store.setSelectProjectName(data);
        }
        get selectProjectName():string{
            return this.store.selectProjectName;
        }
        set selectContractors(data:string){
            this.store.setSelectContractors(data);
        }
        get selectContractors():string{
            return this.store.selectContractors;
        }
        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }
        set selectType(data:string){
            this.store.setSelectType(data);
        }
        get selectType():string{
            return this.store.selectType;
        }
        set selectStatus(data:number){
            this.store.setSelectStatus(data);
        }
        get selectStatus():number{
            return this.store.selectStatus;
		}
        set selectSex(data:number){
            this.store.setSelectSex(data);
        }
        get selectSex():number{
            return this.store.selectSex;
        }
        set selectAge1(data:any){
            this.store.setSelectAge1(data);
        }
        get selectAge1():any{
            return this.store.selectAge1;
        }
        set selectAge2(data:any){
            this.store.setSelectAge2(data);
        }
        get selectAge2():any{
            return this.store.selectAge2;
       }
        set photo(data:string){
            this.store.setPhoto(data);
        }
        get photo():string{
            return this.store.photo;
        }

        set idCardfront(data:string){
            this.store.setIdCardfront(data);
        }
        get idCardfront():string{
            return this.store.idCardfront;
        }

        set idCardReverse(data:string){
            this.store.setIdCardReverse(data);
        }
        get idCardReverse():string{
            return this.store.idCardReverse;
        }

        set certificates(data:string){
            this.store.setCertificate(data);
        }
        get certificates():string{
            return this.store.certificate;
        }

        set grade(data:string){
            this.store.setGrade(data);
        }
        get grade():string{
            return this.store.grade;
        }

        // @Watch("particulars")
        // particularsWatch(x: boolean) {
        //
        //     if (x) return;
        //
        //     this.store.setPeopleInfo(null);
        // }
    }
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
