<?php
/* @var $this ForumController */
/* @var $item array */
?>
	<div id="bbii-header">
		<?php if(!Yii::app()->user->isGuest): ?>
		<?php $messages = BbiiMessage::model()->inbox()->unread()->count('sendto = '.Yii::app()->user->id); ?>
			<div class="bbii-profile-box">
			<?php 
				echo CHtml::link($messages . ' ' . Yii::t('bbii', 'new messages'), array('message/inbox')); 
				echo ' | ' . CHtml::link(Yii::t('bbii', 'My settings'), array('member/view', 'id' =>Yii::app()->user->id)); 
			?>
			</div>
		<?php endif; ?>
		<div class="bbii-title"><?php echo $this->module->forumTitle; ?></div>
		<div id="bbii-menu">
		<?php $this->widget('zii.widgets.CMenu',array(
			'items'=>$item
		)); ?>
		</div>
	</div>
	<?php if(isset($this->bbii_breadcrumbs)):?>
		<?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'homeLink'=>false,
			'links'=>$this->bbii_breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>