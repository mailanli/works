import React, { Component } from 'react';
// 引入antd组件
import {Row,Col,Input,Form ,Radio,Checkbox ,Select ,Button,Card ,Table,Icon} from 'antd';
// 引入单个页面（包括嵌套的子页面）
const FormItem = Form.Item;
const Option = Select.Option;
//表格
const columns = [{
  title: '字段域名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '格式',
  dataIndex: 'format',
  key: 'format',
},{
  title: '字段域长度',
  dataIndex: 'fiellength',
  key: 'fiellength',
},{
  title: '字段域xpath',
  dataIndex: 'xpath',
  key: 'xpath',
},{
  title: '元素类型',
  dataIndex: 'elemType',
  key: 'elemType',
}, {
  title: '输出类型',
  dataIndex: 'outputType',
  key: 'outputType',
},{
  title: '替换空值',
  dataIndex: 'replaceNull',
  key: 'replaceNull',
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <ul className="liLeft win60">
      <li><a href="#" ><i className=" icon-plus"></i></a></li>
      <li><a href="#"  className="disabled" ><i className=" icon-remove"></i></a></li>
      </ul>
  ),
}];

const data = [{
  key: '1',
  name: <Input placeholder="字段域名" />,
  type:<Select
    showSearch
    style={{ width: 100 }}
    placeholder="类型"
    optionFilterProp="children"
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
		<option value="类型">类型</option>
		<option selected="" value="String">String</option>
		<option value="DateTime">DateTime</option>
		<option value="Integer">Integer</option>
		<option value="Long">Long</option>
		<option value="Float">Float</option>
		<option value="SystemDate">SystemDate</option>
	</Select> ,
  format:<Select
    showSearch
    style={{ width: 100 }}
    placeholder="格式"
    optionFilterProp="children"
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >	
  <option value="格式">格式</option>
  <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
  <option value="yyyy年MM月dd日">yyyy年MM月dd日</option>
  <option value="…">…</option>
  </Select>,
  fiellength: <Input placeholder="字段长度" />,
  xpath:<Input placeholder="字段域xpath" /> ,
  elemType: <Select  placeholder="类型 ">
              <option value="类型">类型</option>
              <option value="node">node</option>
              <option value="attribute">attribute</option>
            </Select>,
  outputType:<Select  placeholder="类型 " style={{ width: 50 }}>
              <option value="类型">类型</option>
              <option value="node">node</option>
              <option value="value">value</option>
            </Select> ,
	replaceNull:<Input placeholder="替换空值" /> ,
}];
class AddXml extends Component {	
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	  }
	  normFile = (e) => {
	    console.log('Upload event:', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    return e && e.fileList;
	  }
	 
	render() {
		const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout} label="数据名称">
	              {getFieldDecorator('name', {
	                rules: [{
	                  required: true,
	                  message: '输入显示于右侧文件列表的名称',
	                }],
	              })(
	                <Input placeholder="输入显示于右侧文件列表的名称" />
	              )}
	          </FormItem>
	          <FormItem
		          {...formItemLayout}
		          label="读取对象"
		          hasFeedback
		        >
		          {getFieldDecorator('select', {
		            rules: [
		              { required: true, message: '请选择' },
		            ],
		          })(
		            <Select placeholder="请选择">
		              <Option value="in1">in1</Option>
		              <Option value="in2">in2</Option>
		            </Select>
		          )}
		        </FormItem>
	          <FormItem
	            label="对象扩展名"
	            {...formItemLayout}
	          >
	          {
	             <Radio.Group defaultValue="xml" onChange={this.handleFormLayoutChange}>
	              <Radio.Button value="xml">xml</Radio.Button>
	              <Radio.Button value="excel">excel</Radio.Button>
	              <Radio.Button value="csv">csv</Radio.Button>
	            </Radio.Group>
	             }
	          </FormItem>
	          {/*xml*/}
	          <FormItem {...formItemLayout} label="解析路径(xpath)">
			              {getFieldDecorator('xpath1', {
			                rules: [{
			                  required: true,
			                }],
			              })(
			              	<div>
			                 <div  className="left w90"><Input /></div>
			                  <span className="ant-form-text"> <i className=" icon-question-sign"></i></span>
			                </div>
			              )}
			          </FormItem>
			          
			          <FormItem
			            label="字符集"
			            {...formItemLayout}
			          >
			          <div>
				            <Radio.Group defaultValue="UTF8" onChange={this.handleFormObjectTypeChange} >
				              <Radio.Button value="UTF8" >UTF-8</Radio.Button>
				              <Radio.Button value="UTF16">UTF-16</Radio.Button>
				              <Radio.Button value="GBK">GBK</Radio.Button>
				            </Radio.Group>
			             <span className="ant-form-text"> <i className=" icon-question-sign"></i></span>
			          </div>
		          </FormItem>
		          <FormItem
			            label="是否命名空间"
			            {...formItemLayout}
			          >
			          <div>
		                
				            <Radio.Group defaultValue="true" onChange={this.handleFormObjectTypeChange} >
				              <Radio.Button value="true" >是</Radio.Button>
				              <Radio.Button value="false">否</Radio.Button>
				            </Radio.Group>
			             <span className="ant-form-text"> <i className=" icon-question-sign"></i></span>
	                </div>
		          </FormItem>
		          <FormItem
			            label="是否忽视 comment 类型节点"
			            {...formItemLayout}
			          >
			          <div>
		                
				            <Radio.Group defaultValue="true" onChange={this.handleFormObjectTypeChange} >
				              <Radio.Button value="true" >是</Radio.Button>
				              <Radio.Button value="false">否</Radio.Button>
				            </Radio.Group>
			             <span className="ant-form-text"> <i className=" icon-question-sign"></i></span>
	                </div>
		          </FormItem>
		          <FormItem
			            label="数据域集"
			            {...formItemLayout}
			       >
			       {getFieldDecorator('dataBtn', {
	                rules: [{
	                  required: true,
	                }],
	              })(
	              	<div className="addDataBox addDataBtn">
                    	<a href="#" className="btn">生成数据域集</a>
                        <i className="arrow icon-caret-down"></i>
                    </div>
	              )}
		          </FormItem>
		          <Table columns={columns} dataSource={data} pagination={false}  bordered="true"/>
		          <br />
	          {/* ./xml*/}
	         

	         <div className="btnGroup"> <Button type="primary">添加至读取数据列表</Button><Button>上一步</Button></div>
	       
            </Form> 
            

		)
	}
}
const MyAddXml = Form.create()(AddXml);
export default MyAddXml;