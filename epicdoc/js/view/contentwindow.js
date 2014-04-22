
Ext.define('ED.view.ContentWindow', {
    
    // ATTRIBUTES ---------------------------------------------------------------------------------
    
    extend: 'Ext.window.Window',
    alias: 'widget.edcontentwindow',
    
    // PRIVATE ------------------------------------------------------------------------------------
    
    constructor: function(cfg) {
        var me = this;
        
        me.callParent([Ext.apply(cfg, {
            modal: true,
            title: ED.lang.content,
            layout: {
                type: 'vbox',
                align: 'stretch',
                padding: 10
            },
            defaults: {
                width: 300,
                labelWidth: 75
            },
            items: [{
                xtype: 'textfield',
                itemId: 'title',
                fieldLabel: ED.lang.title,
                allowBlank: false
            }, {
                xtype: 'combobox',
                itemId: 'type',
                fieldLabel: ED.lang.type,
                editable: false,
                value: 'text',
                store: [
                    ['folder', ED.lang.folder],
                    ['text', ED.lang.text]
                ]
            }],
            buttons: [{
                text: ED.lang.ok,
                handler: Ext.bind(me.save, me)
            }, {
                text: ED.lang.cancel,
                handler: Ext.bind(me.close, me)
            }],
            listeners: {
                hide: Ext.bind(me.destroy, me),
                show: function() {
                    Ext.callback('focus', this.down('#title'), [true], 100);
                },
            }
        })]);
    },
    
    form: function(name) {
        return this.down('#' + name);
    },
    
    save: function() {
        var me = this;
        
        if (me.form('title').isValid()) {
            var data = ED.Data;
            
            data.insertData({
                id: data.generateDataId(),
                parentId: me.dataId,
                type: me.form('type').getValue(),
                title: me.form('title').getValue()
            })
            me.close();
        }
    }
});
